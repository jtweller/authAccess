const nodemailer = require('nodemailer');

// Create a transporter with Outlook SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'do_not_reply2024@outlook.com',
    pass: '@dmIn7771',
  },
});

// Example function to send email
const sendEmail = async ({ email, subject, message }) => {
  try {
    await transporter.sendMail({
      from: 'do_not_reply2024@outlook.com',
      to: email,
      subject: subject,
      text: message,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
module.exports = sendEmail;
