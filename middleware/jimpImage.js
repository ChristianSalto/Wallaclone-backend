"use strict";

const Jimp = require("jimp");
var path = require("path");

const imgPath = path.join(__dirname, "../public/img/");

module.exports = async function (filename) {
  Jimp.read(
    `/home/christian/Escritorio/wallaclone-backend/public/img/${filename}`
  )
    .then((img) => {
      return img
        .resize(300, 230) // resize
        .quality(60) // set JPEG quality
        .write(imgPath + `${filename}`); // save
    })
    .catch((err) => {
      console.error(err);
    });
};
