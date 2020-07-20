"use strict";

const express = require("express");
const router = express();

const Cart = require("../models/Cart");

router.get("/", async (req, res, next) => {
  try {
    const username = req.query.autor;

    const ads = await Cart.findOne({ username });

    if (!ads) {
      res.send({
        success: true,
        result: [],
        msj: "You don't have any ad in your cart",
      });
      return;
    } else {
      const { adverts } = ads;
      if (adverts.length === 0) {
        res.send({
          success: true,
          result: [],
          msj: "You don't have any ad in your cart",
        });
        return;
      }
      res.send({
        success: true,
        result: adverts,
        msj: "",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const username = req.query.autor;

    const ads = await Cart.updateOne(
      { username: username },
      { $set: { adverts: [] } }
    );

    res.send({
      success: true,
      result: [],
      msj: "You don't have any ad in your cart",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
