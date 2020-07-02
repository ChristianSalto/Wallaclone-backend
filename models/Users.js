"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailerTransport = require("../lib/nodemailerService");

// creamos esquema
const usersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

usersSchema.statics.hashPassword = function (plainPassword) {
  return bcrypt.hash(plainPassword, 10);
};

// usersSchema.methods.prueba = function (text) {
//   return console.log(text);
// };

usersSchema.statics.sendEmail = function (from, to, subject, body) {
  console.log(from, subject, body, to);
  // enviar el correo:
  return nodemailerTransport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: body,
  });
};

// creamos modelo

const Users = mongoose.model("Users", usersSchema);

// exportamos modelo

module.exports = Users;
