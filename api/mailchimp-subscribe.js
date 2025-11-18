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

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    console.log('Mailchimp response status:', response.status);
    console.log('Mailchimp response data:', responseData);

    if (!response.ok) {
      console.error('Mailchimp error:', responseData);

      // Handle already-subscribed case gracefully
      if (responseData.detail?.includes('already a list member')) {
        return res.status(200).json({ 
          success: true, 
          message: 'Email already subscribed' 
        });
      }

      return res.status(response.status).json({ error: responseData.detail || 'Subscription failed' });
    }

    console.log('Subscription successful for:', email);
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed' 
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
