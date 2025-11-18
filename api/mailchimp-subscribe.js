export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dataCenter = apiKey?.split('-')[1]; // API key format: 'xxxxx-us1'

  if (!apiKey || !audienceId || !dataCenter) {
    console.error('Missing Mailchimp environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  // Create MD5 hash of lowercase email for member ID
  const crypto = await import('crypto');
  const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    const response = await fetch(`${url}/${emailHash}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Mailchimp error:', errorData);

      // Handle already-subscribed case gracefully
      if (errorData.detail?.includes('already a list member')) {
        return res.status(200).json({ 
          success: true, 
          message: 'Email already subscribed' 
        });
      }

      return res.status(response.status).json({ error: errorData.detail || 'Subscription failed' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed' 
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
