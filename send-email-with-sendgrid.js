// TypeScript
import * as sgMail from '@sendgrid/mail'; // Version ^6.2.1

// JavaScript 
const sgMail = require('@sendgrid/mail');

// Sendgrid setting
const SENDGRID_API_KEY = 'SENDGRID_API_KEY';
sgMail.setApiKey(SENDGRID_API_KEY);

const senderEmail = 'Dale Nguyen <hello@dalenguyen.me>';
const sendToEmails = ['receiver-1@example.com', 'receiver-2@example.com'];

// Prepare email content
const msg = {
    to: sendToEmails,
    from: senderEmail,
    subject: 'Email Subject',
    html: 'Hey! I got an email!',
};

// Start sending meails
sgMail.send(msg)
    .then(() => console.log(`Email sent! to ${msg.to}`))
    .catch(err => console.log('Error: ', err))