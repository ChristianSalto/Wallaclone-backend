"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");

router.get("/", async (req, res, next) => {
  try {
    const { name, tags, price } = JSON.parse(req.query.params);
    const date = req.query.sort;
    const limit = parseInt(4);
    const filter = {};
    const sort = {};

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
    const ads = await Ads.list(filter, limit, sort);

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

// router.get("/:id", async (req, res, next) => {
//   try {
//     const id_cards = req.query.id;
//     const filterId = {};
//     filterId._id = id_cards;
//     const ads = await Ads.list(filterId);
//     res.send({
//       ads,
//       msj: "",
//     });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
