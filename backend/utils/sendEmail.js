import nodemailer from "nodemailer";
import "dotenv/config";

export const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;


    const mailOptions = {
      from: `"Netwala" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Thank you for registering.</p>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>This link will expire in 24 hours.</p>
      `
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.log("Email send error:", error);
  }
};
