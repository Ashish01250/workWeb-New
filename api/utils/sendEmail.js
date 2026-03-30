import sgMail from "@sendgrid/mail";

export const sendEmail = async (to, subject, text) => {
  try {
    // ✅ set key here (AFTER dotenv loads)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to,
      from: process.env.EMAIL_FROM,
      subject,
      text,
    };

    await sgMail.send(msg);

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error.response?.body || error.message);
  }
};