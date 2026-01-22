import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = []
}) => {
  try {
    await transporter.sendMail({
      from: `"Netwala" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments
    });
  } catch (error) {
    console.log("Email send error:", error);
  }
};
