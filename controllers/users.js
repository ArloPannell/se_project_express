const User = require("../models/user");
const errorHandler = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => errorHandler(err, res));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) =>
      res.status(201).send({ message: `User ${name} successfully added` })
    )
    .catch((err) => errorHandler(err, res));
};

const getUser = (req, res) => {
  const { userID } = req.params;
  User.findById(userID)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => errorHandler(err, res));
};

module.exports = { getUsers, createUser, getUser };
