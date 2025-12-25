const Item = require("../models/clothingItem");
const errorHandler = require("../utils/errors");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => errorHandler(err, res));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(200).send(item))
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
        err.statusCode = 403;
        throw err;
      }
      return Item.findByIdAndDelete(itemID).orFail();
    })
    .then((deleted) => res.status(200).send(deleted))
    .catch((err) => errorHandler(err, res));
};

const likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemID,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => errorHandler(err, res));
};

const deleteLike = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemID,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => errorHandler(err, res));
};

module.exports = { getItems, createItem, deleteItem, likeItem, deleteLike };
