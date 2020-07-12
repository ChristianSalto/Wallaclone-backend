"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");
const Users = require("../models/Users");

router.get("/", async (req, res, next) => {
  try {
    const autor = req.query.autor;
    const filter = {};
    filter.autor = autor;
    const myAds = await Ads.find(filter);
    if (myAds.length === 0) {
      res.send({
        success: true,
        result: myAds,
        msj: "No hay anuncios con este registro",
      });
      return;
    }

    res.send({
      success: true,
      result: myAds,
      msj: "",
    });
  } catch (err) {
    next(err);
  }
});

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

    const userExists = await Users.findOne({
      $or: [{ email: userUpdate.email }, { username: userUpdate.username }],
    });

    if (userExists !== null) {
      res.send({
        success: false,
        msj: "Usuario o email ya registrados",
      });
      return;
    }

    userUpdate.password = await Users.hashPassword(userUpdate.password);

    const userUpdated = await Users.findOneAndUpdate({ _id: _id }, userUpdate, {
      new: true,
      useFindAndModify: false,
    });

    res.send({
      success: true,
      result: {
        username: userUpdated.username,
        email: userUpdated.email,
      },
      msj: "Update successful",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
