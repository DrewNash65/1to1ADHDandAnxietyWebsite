export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const triggerSecret = process.env.MAILCHIMP_TRIGGER_SECRET;
  if (triggerSecret) {
    const header = req.headers['x-mailchimp-trigger'] || req.headers['x-mailchimp-secret'];
    if (!header || header !== triggerSecret) {
      console.error('Missing or invalid mailchimp trigger secret');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const { title, action } = req.body || {};
  if (!title) return res.status(400).json({ error: 'Missing required field: title' });

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const dataCenter = apiKey?.split('-')[1];
  if (!apiKey || !dataCenter) {
    console.error('Missing Mailchimp API key or data center');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const baseUrl = `https://${dataCenter}.api.mailchimp.com/3.0`;
  try {
    const listRes = await fetch(`${baseUrl}/campaigns?count=100`, {
      headers: { Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}` },
    });
    const listJson = await listRes.json();
    if (!listRes.ok) return res.status(listRes.status).json({ error: listJson.detail || 'Failed to list campaigns', raw: listJson });

    const matches = (listJson.campaigns || listJson.items || listJson).filter?.(c => {
      const t = c?.settings?.title || c?.settings?.subject_line || '';
      return t === title || t.includes(title);
    }) || [];

    if (action !== 'cleanup' && action !== 'archive') {
      return res.status(200).json({ found: matches.length, campaigns: matches.map(c => ({ id: c.id, status: c.status, title: c.settings.title })) });
    }

    const results = [];
    for (const c of matches) {
      const id = c.id;
      const status = c.status;
      try {
        if (action === 'archive') {
          // attempt to archive the campaign (Mailchimp supports archive action)
          const arc = await fetch(`${baseUrl}/campaigns/${id}/actions/archive`, {
            method: 'POST',
            headers: { Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}` },
          });
          const arcJson = await arc.json().catch(() => ({}));
          results.push({ id, status, action: 'archived', ok: arc.ok, raw: arcJson });
          continue;
        }

        // cleanup behavior: delete drafts, cancel scheduled then delete; skip sent
        if (status === 'save') {
          const del = await fetch(`${baseUrl}/campaigns/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}` },
          });
          results.push({ id, status, action: 'deleted_draft', ok: del.ok });
          continue;
        }
        if (status === 'schedule' || status === 'scheduled') {
          await fetch(`${baseUrl}/campaigns/${id}/actions/cancel-send`, {
            method: 'POST',
            headers: { Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}` },
          }).catch(() => null);
          const del2 = await fetch(`${baseUrl}/campaigns/${id}`, { method: 'DELETE', headers: { Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}` } });
          results.push({ id, status, action: 'cancelled_and_deleted', ok: del2.ok });
          continue;
        }
        results.push({ id, status, action: 'skipped_sent' });
      } catch (err) {
        results.push({ id, status, action: 'error', error: String(err) });
      }
    }

    return res.status(200).json({ cleaned: results.length, results });
  } catch (err) {
    console.error('Mailchimp campaigns error', err);
    return res.status(500).json({ error: 'Internal error listing/cleaning campaigns' });
  }
}
