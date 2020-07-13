"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");
const Users = require("../models/Users");
const storeWithOriginalName = require("../middleware/storeWithOriginalName");

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
      success: true,
      msj: "Usuario borrado",
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

router.put("/editads?", async (req, res, next) => {
  try {
    const _id = req.query.id;
    const adsUpdate = req.body;

    if (req.file === undefined) {
      adsUpdate.img = "no-photo.jpg";
    } else {
      const { fileName } = storeWithOriginalName(req.file);
      adsUpdate.img = fileName;
    }

    const adsUpdated = await Ads.findOneAndUpdate({ _id: _id }, adsUpdate, {
      new: true,
      useFindAndModify: false,
    });

    res.send({
      success: true,
      result: adsUpdated,
      msj: "Update successful",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/createads?", async (req, res, next) => {
  try {
    const adsUpdate = req.body;

    if (req.file === undefined) {
      adsUpdate.img = "no-photo.jpg";
    } else {
      const { fileName } = storeWithOriginalName(req.file);
      adsUpdate.img = fileName;
    }

    const ads = new Ads(adsUpdate);
    const adsSaved = await ads.save();

    res.send({
      success: true,
      result: adsSaved,
      msj: "Update successful",
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteads", async (req, res, next) => {
  try {
    const _id = req.body.id;
    await Ads.deleteOne({ _id: _id });

    res.send({
      success: true,
      msj: "Anuncio borrado",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
