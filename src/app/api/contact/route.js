import nodemailer from 'nodemailer';
import axios from 'axios';

export async function POST(req) {
  const { name, email, phone, message, recaptchaToken } = await req.json();

  // Verify reCAPTCHA
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    null,
    {
      params: {
        secret: secret,
        response: recaptchaToken,
      },
    }
  );

  if (!response.data.success) {
    return new Response(
      JSON.stringify({ message: 'reCAPTCHA verification failed' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Contact form submission from ${name}`,
    text: `You have received a new message from your website contact form.
    \n\nHere are the details:
    \nName: ${name}
    \nEmail: ${email}
    \nPhone: ${phone || 'N/A'}
    \nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error sending email', error }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
