'use strict';

const conn = require('./lib/connectMongoose');
const Users = require('./models/Users');

conn.once('open', async () => {
  try {
    await initUsers();
    conn.close();
  } catch (err) {
    console.log('Hubo un error', err);
    process.exit(1);
  }
});

async function initUsers() {
  await Users.deleteMany();
  await Users.insertMany([]);
}
