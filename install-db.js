"use strict";

const conn = require("./lib/connectMongoose");
const Users = require("./models/Users");
const Ads = require("./models/Ads");
const Imgs = require("./models/Imgs");
const adsJson = require("./ads.json");

conn.once("open", async () => {
  try {
    await initUsers();
    await initAds();
    await initImgs();
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
  await Users.insertMany([
    {
      username: "chr",
      email: "chr@chr",
      password: await Users.hashPassword("1234"),
    },
  ]);
}

async function initImgs() {
  await Imgs.deleteMany();
  const refImg = await Ads.find({}, { _id: 1, img: 1 });
  await Imgs.insertMany(refImg);
}
