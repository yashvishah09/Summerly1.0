const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = 'Yashvi Shah <shahyashvi67@gmail.com';
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      //Sendgrid

      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  send(template, subject) {
    //Send the actual email
    // 1 Rs
  }

  sendWelcome() {
    this.send('welcome', 'Welcome to summerly');
  }
};

const sendEmail = async (options) => {
  //2- Define the email options
  const mailOptions = {
    from: 'Yashvi Shah <shahyashvi67@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
    tls: { rejectUnauthorized: false }
    //html
  };

  //3-Actually send the email
  await transporter.sendMail(mailOptions);
};
