"use strict";

const mongoose = require("mongoose");

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Conectado a MongoDB en", conn.name);
});

conn.on("error", (err) => {
  console.error("Error de conexion", err);
  process.exit(1);
});

const connMongoDB = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(
  connMongoDB === undefined ? "mongodb://localhost/wallaclone" : connMongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = conn;
