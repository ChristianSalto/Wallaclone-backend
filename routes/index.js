var express = require('express');
var router = express.Router();

// const Users = require('../models/Users');

// router.get('/users', (req, res, next) => {
//   Users.find().exec((err, docs) => {
//     res.json(docs)
//   });
// });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
