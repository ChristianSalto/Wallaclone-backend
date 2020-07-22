"use strict";

const nodemailer = require("nodemailer");

// crear transport
// let transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "20ea8efa86286f",
//     pass: "77814d2f63978f",
//   },
// });

const transport = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465,
  auth: {
    user: process.env.SMTP_CREDENTIALS_USER,
    pass: process.env.SMTP_CREDENTIALS_PASS,
  },
});
module.exports = transport;
