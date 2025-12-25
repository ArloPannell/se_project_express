const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  deleteLike,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.get("/", getItems);

router.post("/", auth, createItem);

router.delete("/:itemID", auth, deleteItem);

router.put("/:itemID/likes", auth, likeItem);

router.delete("/:itemID/likes", auth, deleteLike);

module.exports = router;
