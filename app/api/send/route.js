import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    // Create transporter (configurable host)
    const transporter = nodemailer.createTransport({
      host: process.env.NODE_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_USER,
        pass: process.env.NODE_PASS,
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.NODE_USER}>`,
      to: "parassaxenaofficial@gmail.com", // your inbox
      subject: `📬 Portfolio Message — ${subject}`,
      html: `
        <h2 style="color:#2d89ef;">📩 New Message from Portfolio Website</h2>
        <p><b>From:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
        <hr/>
        <p style="font-size:13px;color:#666;">
          This message was automatically sent from your portfolio contact section.
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}
