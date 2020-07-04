"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const date = req.query.sort;
    const limit = parseInt(4);
    const filtro = {};
    const sort = {};

    if (name !== "undefined") {
      filtro.name = new RegExp(`^${name}`, "i");
    }

    if (date !== "false" && date !== "undefined") {
      sort.date = -1;
      console.log("estoy en date " + date);
    }

    console.log(sort);
    const ads = await Ads.list(filtro, limit, sort);
    console.log(ads);
    if (ads.length === 0) {
      res.send({
        ads,
        msj: "There aren't ads with these criteria!!!!",
      });
      return;
    }
    res.send({
      ads,
      msj: "",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
