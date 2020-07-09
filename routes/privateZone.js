"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");
const Users = require("../models/Users");

router.delete("/", async (req, res, next) => {
  try {
    const _id = req.body.id;
    await Users.deleteOne({ _id: _id });

    res.send({
      path: "/",
    });
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const _id = req.body.id;
    const userUpdate = req.body.params;
    console.log(userUpdate, _id);

    const userUpdated = await Users.findOneAndUpdate({ _id: _id }, userUpdate, {
      new: true,
      useFindAndModify: false,
    });

    res.send({
      success: true,
      username: userUpdated.username,
      email: userUpdated.email,
      msj: "Update successful",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
