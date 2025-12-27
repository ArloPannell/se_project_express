const validator = require("validator");
const Item = require("../models/clothingItem");
const errorHandler = require("../utils/errors");

const { OK, FORBIDDEN, BADREQUEST, SERVERERROR } = require("../utils/config");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => {
      return res.send(items);
    })
    .catch((err) => errorHandler(err, res));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  if (!name || !weather || !imageUrl) {
    return res.status(BADREQUEST).send({ message: "Missing Item Information" });
  }

  if (typeof name !== "string") {
    return res.status(BADREQUEST).send({ message: "Name must be a string" });
  }
  const trimmedName = name.trim();
  const nameOptions = Item.schema.path("name").options;
  const min = nameOptions.minlength || 0;
  const max = nameOptions.maxlength || Infinity;
  if (trimmedName.length < min || trimmedName.length > max) {
    return res
      .status(BADREQUEST)
      .send({ message: `Name must be between ${min} and ${max} characters` });
  }

  if (!validator.isURL(imageUrl)) {
    return res.status(BADREQUEST).send({ message: "URL not valid" });
  }
  Item.create({
    name: trimmedName,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => {
      return res.status(OK).send(item);
    })
    .catch((err) => errorHandler(err, res));
};

const deleteItem = (req, res) => {
  const { itemID } = req.params;
  const { _id: reqOwner } = req.user;

  Item.findById(itemID)
    .orFail()
    .then((item) => {
      const ownerId = item.owner && item.owner.toString();
      if (ownerId !== reqOwner) {
        const err = new Error("Not authorized to delete this item");
        err.statusCode = FORBIDDEN;
        throw err;
      }
      return Item.findByIdAndDelete(itemID).orFail();
    })
    .then((deleted) => res.status(OK).send(deleted))
    .catch((err) => errorHandler(err, res));
};

const likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemID,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      return res.status(OK).send(item);
    })
    .catch((err) => errorHandler(err, res));
};

const deleteLike = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemID,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      return res.status(OK).send(item);
    })
    .catch((err) => errorHandler(err, res));
};

module.exports = { getItems, createItem, deleteItem, likeItem, deleteLike };
