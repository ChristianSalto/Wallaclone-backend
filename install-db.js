"use strict";

const conn = require("./lib/connectMongoose");
const Users = require("./models/Users");
const adsJson = require("./ads.json");
const Ads = require("./models/Ads");

conn.once("open", async () => {
  try {
    await initUsers();
    await initAds();
    conn.close();
  } catch (err) {
    console.log("Hubo un error", err);
    process.exit(1);
  }
});

async function initAds() {
  await Ads.deleteMany();
  await Ads.insertMany(adsJson);
}

async function initUsers() {
  await Users.deleteMany();
  await Users.insertMany([]);
}
