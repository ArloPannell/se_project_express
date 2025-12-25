const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const errorHandler = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userNoPassword = user.toObject();
      delete userNoPassword.password;
      return res.status(201).send(userNoPassword);
    })
    .catch((err) => errorHandler(err, res));
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => errorHandler(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => errorHandler(err, res));
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name: name, avatar: avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => errorHandler(err, res));
};

module.exports = { createUser, getCurrentUser, login, updateUser };
