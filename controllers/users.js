const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const errorHandler = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { OK, CREATED, BADREQUEST, SERVERERROR } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!name || !avatar || !email || !password) {
    return res.status(BADREQUEST).send({ message: "Missing user information" });
  }

  if (typeof name !== "string") {
    return res.status(BADREQUEST).send({ message: "Name must be a string" });
  }
  const trimmedName = name.trim();
  const nameOptions = User.schema.path("name").options;
  const nameMin = nameOptions.minlength || 0;
  const nameMax = nameOptions.maxlength || Infinity;
  if (trimmedName.length < nameMin || trimmedName.length > nameMax) {
    return res.status(BADREQUEST).send({
      message: `Name must be between ${nameMin} and ${nameMax} characters`,
    });
  }

  if (!validator.isURL(avatar)) {
    return res
      .status(BADREQUEST)
      .send({ message: "Avatar must be a valid URL" });
  }
  if (!validator.isEmail(email)) {
    return res.status(BADREQUEST).send({ message: "Email not valid" });
  }

  const pwdMin = User.schema.path("password").options.minlength || 0;
  if (password.length < pwdMin) {
    return res
      .status(BADREQUEST)
      .send({ message: `Password must be at least ${pwdMin} characters` });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name: trimmedName, avatar, email, password: hash })
    )
    .then((user) => {
      const userNoPassword = user.toObject();
      delete userNoPassword.password;
      return res.status(CREATED).send(userNoPassword);
    })
    .catch((err) => errorHandler(err, res));
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => {
      return res.status(OK).send(user);
    })
    .catch((err) => errorHandler(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BADREQUEST)
      .send({ message: "Missing Email or Password" });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OK).send({ token });
    })
    .catch((err) => errorHandler(err, res));
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  const updates = {};

  if (name !== undefined) {
    if (typeof name !== "string") {
      return res.status(BADREQUEST).send({ message: "Name must be a string" });
    }
    const trimmedName = name.trim();
    const nameOptions = User.schema.path("name").options;
    const nameMin = nameOptions.minlength || 0;
    const nameMax = nameOptions.maxlength || Infinity;
    if (trimmedName.length < nameMin || trimmedName.length > nameMax) {
      return res.status(BADREQUEST).send({
        message: `Name must be between ${nameMin} and ${nameMax} characters`,
      });
    }
    updates.name = trimmedName;
  }

  if (avatar !== undefined) {
    if (!validator.isURL(avatar)) {
      return res
        .status(BADREQUEST)
        .send({ message: "Avatar must be a valid URL" });
    }
    updates.avatar = avatar;
  }

  User.findByIdAndUpdate(_id, updates, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => {
      return res.status(OK).send(user);
    })
    .catch((err) => errorHandler(err, res));
};

module.exports = { createUser, getCurrentUser, login, updateUser };
