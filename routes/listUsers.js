const express = require("express");
const router = express();

const Ads = require("../models/Ads");
const Users = require("../models/Users");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find();
    const names = users.map((name) => name.username);
    res.send({ result: names });
  } catch (err) {
    next(err);
  }
});

router.get("/ads", async (req, res, next) => {
  try {
    const autor = req.query.autor;
    const date = req.query.sort;
    const limit = parseInt(4);
    const filter = {};
    const sort = {};
    filter.autor = autor;

    if (date !== "false" && date !== "undefined") {
      sort.date = -1;
    }

    const myAds = await Ads.list(filter, limit, sort);

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

module.exports = router;
