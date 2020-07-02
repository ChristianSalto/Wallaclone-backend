var express = require("express");
var router = express.Router();

const Users = require("../models/Users");

router.post("/", async (req, res, next) => {
  try {
    const userData = req.body;

    const user = new Users(userData);

    const userLoged = await Users.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (userLoged !== null) {
      res.send({
        success: false,
        result: [],
        msj: "Usuario o email ya registrados",
      });
      return;
    }

    user.password = await Users.hashPassword(user.password);
    const userSave = await user.save();


    res.status(201).send({
      success: true,
      result: userSave,
      msj: "Usuario guardado con exito",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
