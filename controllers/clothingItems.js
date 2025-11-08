const Item = require("../models/clothingItem");
const errorHandler = require("../utils/errors");

const getItems = (req, res) => {
  Item.find({})
    .orFail()
    .then((items) => res.send(items))
    .catch((err) => errorHandler(err, res));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      return res.status(200).send({ message: "Clothing Item Added" });
    })
    .catch((err) => errorHandler(err, res));
};

const deleteItem = (req, res) => {
  console.log("Delete from controller");
  const { itemID } = req.params;
  console.log(itemID);
  Item.findByIdAndDelete(itemID)
    .orFail()
    .then(() => {
      return res.status(200).send({ message: "Clothing Item Deleted" });
    })
    .catch((err) => errorHandler(err, res));
};

const likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemID,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(() => {
      return res.status(200).send({ message: "Like successfully added" });
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
    .then(() => {
      return res.status(200).send({ message: "Removed Like" });
    })
    .catch((err) => errorHandler(err, res));
};

module.exports = { getItems, createItem, deleteItem, likeItem, deleteLike };
