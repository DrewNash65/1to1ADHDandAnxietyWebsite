export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // simple secret header check to prevent public misuse
  const triggerSecret = process.env.MAILCHIMP_TRIGGER_SECRET;
  if (triggerSecret) {
    const header = req.headers['x-mailchimp-trigger'] || req.headers['x-mailchimp-secret'];
    if (!header || header !== triggerSecret) {
      console.error('Missing or invalid mailchimp trigger secret');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const {
    title,
    url,
    subject,
    preview,
    audienceId: bodyAudienceId,
    from_name,
    reply_to,
    htmlContent // optional: full HTML body to use instead of generated snippet
  } = req.body || {};

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const defaultAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const audienceId = bodyAudienceId || defaultAudienceId;
  const dataCenter = apiKey?.split('-')[1]; // API key format: 'xxxxx-us1'

  if (!apiKey || !audienceId || !dataCenter) {
    console.error('Missing Mailchimp environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!title || !url) {
    return res.status(400).json({ error: 'Missing required fields: title and url' });
  }

  // Build campaign subject and preview if not provided
  const campaignSubject = subject || `New: ${title}`;
  const previewText = preview || url;
  const fromName = from_name || 'Andrew L. Nash, MD';
  const replyTo = reply_to || 'ADHD@1to1Pediatrics.com';

  const baseUrl = `https://${dataCenter}.api.mailchimp.com/3.0`;

  try {
    // 1) Create campaign
    const createRes = await fetch(`${baseUrl}/campaigns`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'regular',
        recipients: { list_id: audienceId },
        settings: {
          subject_line: campaignSubject,
          preview_text: previewText,
          title: `Blog: ${title}`,
          from_name: fromName,
          reply_to: replyTo,
        },
      }),
    });

    const created = await createRes.json();
    if (!createRes.ok) {
      console.error('Mailchimp create campaign error', created);
      return res.status(createRes.status).json({ error: created.detail || 'Failed to create campaign', raw: created });
    }

    const campaignId = created.id;

    // 2) Set campaign content
    let html = htmlContent;
    if (!html) {
      // minimal HTML template for the campaign body
      html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${campaignSubject}</title>
</head>
<body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; color:#14213d;">
  <div style="max-width:680px;margin:0 auto;padding:24px">
    <header style="text-align:center;margin-bottom:18px">
      <img src="https://adhd.1to1pediatrics.com/images/1to1ADHDLogo2.png" alt="1-to-1 ADHD" style="height:48px;object-fit:contain" />
    </header>
    <main>
      <h1 style="font-size:22px;margin-bottom:10px"><a href="${url}" style="color:#0e8a9b;text-decoration:none">${title}</a></h1>
      <p style="color:#6b7280;margin-bottom:18px">${preview || ''}</p>
      <p style="text-align:left"><a href="${url}" style="display:inline-block;padding:10px 16px;border-radius:6px;background:#f59e0b;color:#fff;text-decoration:none;font-weight:600">Read the article</a></p>
    </main>
    <footer style="margin-top:28px;color:#6b7280;font-size:13px">
      <p>If you no longer wish to receive these emails, please unsubscribe via the link inserted by Mailchimp.</p>
    </footer>
  </div>
</body>
</html>`;
    }

    const setContentRes = await fetch(`${baseUrl}/campaigns/${campaignId}/content`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html }),
    });

    const contentResult = await setContentRes.json();
    if (!setContentRes.ok) {
      console.error('Mailchimp set content error', contentResult);
      return res.status(setContentRes.status).json({ error: contentResult.detail || 'Failed to set campaign content', raw: contentResult });
    }

    // 3) Send campaign
    const sendRes = await fetch(`${baseUrl}/campaigns/${campaignId}/actions/send`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
    });

    if (!sendRes.ok) {
      const sendResult = await sendRes.json().catch(() => ({}));
      console.error('Mailchimp send error', sendResult);
      return res.status(sendRes.status).json({ error: sendResult.detail || 'Failed to send campaign', raw: sendResult });
    }

    return res.status(200).json({ success: true, campaignId });
  } catch (err) {
    console.error('Mailchimp API error', err);
    return res.status(500).json({ error: 'Internal error creating/sending campaign' });
  }
}
