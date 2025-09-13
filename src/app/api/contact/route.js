import nodemailer from 'nodemailer';

const attempts = new Map();

export async function POST(req) {
  try {
    const { name, email, phone, message, recaptchaToken } = await req.json();

    if (!name || !email || !message || !recaptchaToken) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (process.env.NODE_ENV === 'production') {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
      const now = Date.now();
      const userAttempts = attempts.get(ip) || [];
      const recentAttempts = userAttempts.filter(
        (time) => now - time < 3600000,
      );

      if (recentAttempts.length >= 10) {
        return Response.json(
          { message: 'Too many attempts. Please try again in an hour.' },
          { status: 429 },
        );
      }

      attempts.set(ip, [...recentAttempts, now]);
    }

    let recaptchaData = { score: 'N/A' };

    if (process.env.NODE_ENV === 'development') {
      console.log('Skipping reCAPTCHA in development');
    } else {
      const verifyUrl = new URL(
        'https://www.google.com/recaptcha/api/siteverify',
      );
      verifyUrl.searchParams.append('secret', process.env.RECAPTCHA_SECRET_KEY);
      verifyUrl.searchParams.append('response', recaptchaToken);

      const recaptchaResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      recaptchaData = await recaptchaResponse.json();

      console.log('reCAPTCHA response:', recaptchaData);

      if (!recaptchaData.success) {
        console.error('reCAPTCHA errors:', recaptchaData['error-codes']);
        return Response.json(
          { message: 'Security verification failed' },
          { status: 400 },
        );
      }

      if (recaptchaData.score < 0.3) {
        console.log('Low score:', recaptchaData.score);
        return Response.json(
          { message: 'Request appears automated' },
          { status: 400 },
        );
      }
    }

    if (
      [name, email, message].some(
        (field) => field.includes('\n') || field.includes('\r'),
      )
    ) {
      return Response.json(
        { message: 'Invalid input detected' },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `New contact form submission:
      
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Sent from your portfolio contact form
reCAPTCHA Score: ${recaptchaData.score || 'N/A'}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <table style="width: 100%; max-width: 600px;">
          <tr>
            <td style="font-weight: bold; padding: 8px 0;">Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0;">Phone:</td>
            <td style="padding: 8px 0;">${phone || 'Not provided'}</td>
          </tr>
        </table>
        <h3>Message:</h3>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </p>
        <hr style="margin-top: 30px;">
        <p style="color: #666; font-size: 12px;">
          Sent from your portfolio contact form<br>
          reCAPTCHA Score: ${recaptchaData.score || 'N/A'}
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return Response.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 },
    );
  }
}
