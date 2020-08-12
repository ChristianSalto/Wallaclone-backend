"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");

router.get("/", async (req, res, next) => {
  try {
    const { name, tags, price, skip } = JSON.parse(req.query.params);
    const date = req.query.sort;
    const limit = parseInt(4);
    const filter = {};
    const sort = {};

    console.log(req.query.params)

    if (name !== "") {
      filter.name = new RegExp(`^${name}`, "i");
    }

    if (date !== "false" && date !== "undefined") {
      sort.date = -1;
    }

    if (tags !== "default" && tags !== "") {
      filter.tags = tags;
    }

    if (price !== "") {
      filter.price = { $lte: price };
    }

    const ads = await Ads.list(filter, limit, sort, skip);

    if (ads.length === 0) {
      res.send({
        success: false,
        result: ads,
        msj: "There aren't ads with these criteria!!!!",
      });
      return;
    }
    res.send({
      success: true,
      result: ads,
      msj: "",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
