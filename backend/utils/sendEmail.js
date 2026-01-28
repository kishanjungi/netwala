import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = []
}) => {
  try {
    await resend.emails.send({
      from: "Netwala <onboarding@resend.dev>", 
      to,
      subject,
      html,
      attachments: attachments.map(file => ({
        filename: file.filename,
        content: file.content, 
      })),
    });
  } catch (error) {
    console.log("Email send error:", error);
  }
};