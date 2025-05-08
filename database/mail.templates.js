import { sendMail } from '../config/nodemailer.js';

const sendPasswordResetEmail = async (userEmail, userName, token) => {
  const resetLink = `https://yourdomain.com/reset-password?token=${token}`;

  const html = `
    <h2>Hello ${userName},</h2>
    <p>You requested a password reset. Click the link below to reset it:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link will expire in 30 minutes.</p>
    <p>If you did not request this, please ignore the email.</p>
  `;

  await sendMail(userEmail, "Password Reset Request", html);
};

export { sendPasswordResetEmail };
