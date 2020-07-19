"use strict";

const fs = require("fs");
const path = require("path");

// Con este middelware cambiamos o renombramos el nombre que se
// nos guarda por defecto al nombre original de la imagen

module.exports = function (file) {
  const fullNewPath = path.join(file.destination, file.originalname);
  fs.renameSync(file.path, fullNewPath);
  return {
    fileName: file.originalname,
  };
};
