'use strict'

const express = require("express");
const router = express();

const Ads = require("../../models/Ads");

router.get("/", async (req, res, next) => {
    try {
        const allAds = await Ads.find()
        res.json(allAds)
    } catch (err) {
        next(err);
    }
})

module.exports = router;