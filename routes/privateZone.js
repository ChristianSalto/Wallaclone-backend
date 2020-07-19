"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");
const Imgs = require("../models/Imgs");
const Users = require("../models/Users");
const storeWithOriginalName = require("../middleware/storeWithOriginalName");
const jimpImage = require("../middleware/jimpImage");

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
        msj: "There are no ads with this register",
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
    const user = req.body.user;

    await Users.deleteOne({ _id: _id });
    await Ads.deleteOne({ autor: user });

    res.send({
      success: true,
      msj: "Deleted user",
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
        msj: "User or email already registered",
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
      adsUpdate.img = "no-photo.png";
    } else {
      const { fileName } = storeWithOriginalName(req.file);
      adsUpdate.img = fileName;
      await jimpImage(fileName);
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

router.put("/statusads?", async (req, res, next) => {
  try {
    const _id = req.query.id;
    const adsUpdate = req.body.ads;

    if (adsUpdate.status === "vendido") {
      adsUpdate.img = "sold.jpeg";
    } else if (adsUpdate.status === "reservado") {
      adsUpdate.img = "reserved.jpg";
    } else {
      const nameImg = await Imgs.findOne({ _id: _id });
      adsUpdate.img = nameImg.img;
    }

    const adsUpdated = await Ads.findOneAndUpdate({ _id: _id }, adsUpdate, {
      new: true,
      useFindAndModify: false,
    });

    res.send({
      success: true,
      result: [adsUpdated],
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
      adsUpdate.img = "no-photo.png";
    } else {
      const { fileName } = storeWithOriginalName(req.file);
      adsUpdate.img = fileName;
      await jimpImage(fileName);
    }

    const ads = new Ads(adsUpdate);
    const refImg = {
      _id: ads._id,
      img: ads.img,
    };

    const adsSaved = await ads.save();
    const imgs = new Imgs(refImg);
    await imgs.save();

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
      msj: "Deleted ad",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
