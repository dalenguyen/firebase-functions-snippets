// JavaScript 
import nodemailer from 'nodemailer';

// nodemailer settings
const mailer = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILGUN_EMAIL,
    pass: process.env.MAILGUN_PASSWORD
  }
});

exports.sendByeEmail = functions.https.onRequest((request, response) => {
  const email = request.query.email;
  const firstname = request.query.firstname;
  return sendEmail(email, firstname);
});

async function sendEmail(email, firstname) {

  const mailOptions = {
    from: 'Daniel N. <hi@danielnaranjo.dev>',
    to: `${validEmail(email)}`
  };

  mailOptions.subject = `Mailgun is awesome!`;
  mailOptions.text = `Hello ${firstname}, Greeting from Buenos Aires, Argentina!`;
  await mailer.sendMail(mailOptions);

  return null;
}


// Validate email
function validEmail(email) {
    const regex = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g`;
    return regex.test(email);
}