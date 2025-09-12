import nodemailer from 'nodemailer';

//in-memory rate limiting
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

    // (5 requests per hour per IP)
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const now = Date.now();
    const userAttempts = attempts.get(ip) || [];
    const recentAttempts = userAttempts.filter((time) => now - time < 3600000); // 1 hour window

    if (recentAttempts.length >= 5) {
      return Response.json(
        { message: 'Too many attempts. Please try again later.' },
        { status: 429 },
      );
    }

    attempts.set(ip, [...recentAttempts, now]);

    // const recaptchaResponse = await fetch(
    //   `https://www.google.com/recaptcha/api/siteverify`,
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    //   },
    // );

    // const recaptchaData = await recaptchaResponse.json();

    // if (!recaptchaData.success || recaptchaData.score < 0.5) {
    //   console.log('ReCAPTCHA failed:', recaptchaData);
    //   return Response.json(
    //     { message: 'Security verification failed' },
    //     { status: 400 },
    //   );
    // }

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

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

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
`,
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
//Sent from your portfolio contact form ReCAPTCHA Score: ${recaptchaData.score}`,
//  ReCAPTCHA Score: ${recaptchaData.score}

// import nodemailer from 'nodemailer';
// import axios from 'axios';

// export async function POST(req) {
//   const { name, email, phone, message, recaptchaToken } = await req.json();

//   // Verify reCAPTCHA
//   const secret = process.env.RECAPTCHA_SECRET_KEY;
//   const response = await axios.post(
//     `https://www.google.com/recaptcha/api/siteverify`,
//     null,
//     {
//       params: {
//         secret: secret,
//         response: recaptchaToken,
//       },
//     },
//   );

//   if (!response.data.success) {
//     return new Response(
//       JSON.stringify({ message: 'reCAPTCHA verification failed' }),
//       {
//         status: 400,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//   }

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.RECIPIENT_EMAIL,
//     subject: `New Pfolio Message from ${name}!`,
//     text: `You have received a new message from your website contact form. Here are the details:
//     \nEmail: ${email}
//     Name: ${name}
//     Phone: ${phone || 'N/A'}
//     \nMessage: ${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return new Response(
//       JSON.stringify({ message: 'Email sent successfully' }),
//       {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ message: 'Error sending email', error }),
//       {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//   }
// }
