"use strict";

const mongoose = require("mongoose");

// creo un esquema modelo para BD
const addSchema = mongoose.Schema({
  img: String,
  name: String,
  tags: [String],
  description: String,
  autor: String,
  date: Date,
  price: Number,
  status: String,
});

// creo modelo
// addSchema.statics.list = function (filtro, limit, skip, sort, fields) {
//   const query = Ads.find(filtro);
//   query.skip(skip);
//   query.limit(limit);
//   query.sort(sort);
//   query.select(fields);
//   return query.exec();
// };

addSchema.statics.list = function (filter, limit, sort) {
  const query = Ads.find(filter);
  query.limit(limit);
  query.sort(sort);
  return query.exec();
};

const Ads = mongoose.model("Ads", addSchema);

// exportamos el modelo
module.exports = Ads;
