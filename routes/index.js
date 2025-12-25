const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

const auth = require("../middlewares/auth");

const { createUser, login } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use("/signin", login);
router.use("/signup", createUser);

router.use((req, res) =>
  res.status(404).send({ message: "Requested resource not found" })
);

module.exports = router;
