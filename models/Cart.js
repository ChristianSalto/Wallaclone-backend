"use strict";

const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  username: String,
  adverts: [Object],
});

const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;
