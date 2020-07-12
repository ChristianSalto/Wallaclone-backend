"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");

router.get("/", async (req, res, next) => {
  try {
    const id_cards = req.query.id;
    const filterId = {};
    filterId._id = id_cards;
    const ads = await Ads.list(filterId);
    res.send({
      result: ads,
      msj: "",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
