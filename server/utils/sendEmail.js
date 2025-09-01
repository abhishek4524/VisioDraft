import nodemailer from "nodemailer";

const sendResetEmail = async (to, url) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail app password
    },
  });

  await transporter.sendMail({
    from: `"Visio Draft" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Instructions",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${url}">${url}</a>
      <p>If you didn’t request this, ignore this email.</p>
    `,
  });
};

export default sendResetEmail;
