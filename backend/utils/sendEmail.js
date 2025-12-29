import nodemailer from "nodemailer";
import "dotenv/config";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Netwala" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

  } catch (error) {
    console.log("Email send error:", error);
  }
};
