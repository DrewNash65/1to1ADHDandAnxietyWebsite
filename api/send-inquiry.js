// Resend API endpoint for patient inquiry form submission
// Using fetch to call Resend API directly

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { parentName, phoneNumber, email, patientName, dateOfBirth, concerns } = req.body;

        // Validate required fields
        if (!parentName || !phoneNumber || !email || !patientName || !dateOfBirth || !concerns) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Create email content
        const emailContent = `
New Patient Inquiry - 1-to-1 ADHD & Anxiety Solutions

PARENT/GUARDIAN INFORMATION:
• Name: ${parentName}
• Email: ${email}
• Phone: ${phoneNumber}

PATIENT INFORMATION:
• Name: ${patientName}
• Date of Birth: ${dateOfBirth}

CONCERNS:
${concerns}

Submitted: ${new Date().toLocaleString()}

---
This is an automated message from your website contact form.
Practice launches Early January 2026 - Patient is reserving consultation spot.
        `.trim();

        // Send email using Resend API directly
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'noreply@1to1pediatrics.com',
                to: ['ADHD@1to1Pediatrics.com'],
                subject: `New Patient Inquiry: ${patientName}`,
                html: emailContent.replace(/\n/g, '<br>'),
                text: emailContent,
                replyTo: email
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Resend API error:', errorData);
            return res.status(500).json({ error: 'Failed to send email: ' + errorData.message });
        }

        const data = await response.json();

        // Also send confirmation email to parent
        try {
            const confirmationResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'noreply@1to1pediatrics.com',
                    to: [email],
                    subject: 'Your Consultation Inquiry - 1-to-1 ADHD & Anxiety Solutions',
                    html: `
                      <h2>Thank You for Your Inquiry!</h2>
                      <p>Dear ${parentName},</p>
                      <p>We've received your inquiry for ${patientName} and will contact you within 24-48 hours to schedule your consultation for our Early January 2026 launch.</p>

                      <h3>What to Expect Next:</h3>
                      <ul>
                        <li>Dr. Nash will review your information</li>
                        <li>We'll contact you to schedule a virtual consultation</li>
                        <li>We'll discuss your child's specific needs and our approach</li>
                      </ul>

                      <p>If you need to reach us sooner, please email: ADHD@1to1Pediatrics.com</p>

                      <p>Warm regards,<br>
                      Andrew L. Nash, MD FAAP<br>
                      1-to-1 ADHD & Anxiety Solutions</p>
                    `,
                    text: `Thank you for your inquiry! We've received your request and will contact you within 24-48 hours to schedule your consultation for our Early January 2026 launch.`,
                    replyTo: 'ADHD@1to1Pediatrics.com'
                })
            });

            if (!confirmationResponse.ok) {
                const errorData = await confirmationResponse.json();
                console.error('Confirmation email failed:', errorData);
                // Log the error but don't fail the main request
            } else {
                const confirmationData = await confirmationResponse.json();
                console.log('Confirmation email sent successfully:', confirmationData.id);
            }
        } catch (confirmationError) {
            console.error('Confirmation email error:', confirmationError);
            // Don't fail the request if confirmation email fails
        }

        return res.status(200).json({
            success: true,
            message: 'Inquiry submitted successfully',
            id: data.id
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Internal server error: ' + error.message,
            message: 'Please try again or contact us directly at ADHD@1to1Pediatrics.com'
        });
    }
}