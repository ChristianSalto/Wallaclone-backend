"use strict";

const mongoose = require("mongoose");

// creo un esquema modelo para BD
const imgSchema = mongoose.Schema({
  _id: String,
  img: String,
});

const Imgs = mongoose.model("Imgs", imgSchema);

// exportamos el modelo
module.exports = Imgs;
