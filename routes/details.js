"use strict";

const express = require("express");
const router = express();

const Ads = require("../models/Ads");
const Cart = require("../models/Cart");

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

router.post("/cart", async (req, res, next) => {
  try {
    const data = req.body;

    const addCart = {
      username: data.username,
      adverts: data.adverts,
    };

    const user = await Cart.findOne({ username: addCart.username });

    if (!user) {
      const cart = new Cart(addCart);
      await cart.save();
    } else {
      const { _id } = addCart.adverts[0];
      const ads = await Cart.findOne({
        username: addCart.username,
        "adverts._id": _id,
      });
      if (!ads) {
        await Cart.updateOne(
          { username: addCart.username },
          { $push: { adverts: addCart.adverts } }
        );
      } else {
        res.send({
          success: false,
          msj: "Already exists in your cart",
        });
        return;
      }
    }
    res.send({
      success: true,
      msj: "Successfully added",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
