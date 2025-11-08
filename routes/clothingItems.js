const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  deleteLike,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", createItem);

router.delete("/:itemID", deleteItem);

router.put("/:itemID/likes", likeItem);

router.delete("/:itemID/likes", deleteLike);

module.exports = router;
