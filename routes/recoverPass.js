"use strict";

const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const app = express();

router.post("/", async (req, res, next) => {
  const email = req.body.email;
  app.set("email", email);

  const user = await Users.findOne({ email: email });

  if (!user) {
    res.send({
      success: false,
      msj: "This email does not exist",
    });
    return;
  }

  // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "2d",
  // });

  // const recoverUser = {
  //   success: true,
  //   username: user.username,
  //   email: user.email,
  //   token: token,
  // };

  res.json({
    success: true,
    msj: "check your email if you received a message",
  });

  await Users.sendEmail(
    "romeosaltovk@gmail.com",
    "romeosaltovk@gmail.com",
    "Recover password",
    `
    <p>click 
    <a href=http://localhost:3006/newpass>here</a>
    to reset password
    </p>
    `
  );
});

router.put("/", async (req, res, next) => {
  const email = app.get("email");
  const password = await Users.hashPassword(req.body.password);

  const user = await Users.findOne({ email: email });

  if (!user) {
    res.send({ msj: "you must receive a gmail to change the password" });
    return;
  }

  const resetPass = await Users.findOneAndUpdate(
    { _id: user._id },
    { password },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  app.set("email", null);

  res.send({
    success: true,
    result: resetPass,
    msj: "your password has been restored",
  });
});

module.exports = router;
