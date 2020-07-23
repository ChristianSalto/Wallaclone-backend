"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");



router.post("/", async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    

    const user = await Users.findOne({ username: username });
    // console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // const error = new Error("Invalid credentials");
      // error.status = 401;
      // next(error);
      res.send({
        success: false,
        result: {
          username: user,
          email: user,
          id: user,
          token: null,
        },
        msj: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const newUser = {
      success: true,
      result: {
        username: user.username,
        email: user.email,
        id: user._id,
        token: token,
      },
      msj: "Successfully logged in",
    };

    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
