"use strict";

const nodemailer = require("nodemailer");

// crear transport
let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "20ea8efa86286f",
    pass: "77814d2f63978f",
  },
});
module.exports = transport;
