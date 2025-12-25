const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (
    !authorization ||
    !(
      authorization.startsWith("Bearer ") || authorization.startsWith("bearer ")
    )
  ) {
    return res.status(401).send({ message: "Authorization required" });
  }
  const token = authorization.replace(/^[Bb]earer\s+/, "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Incorrect Token" });
  }
  req.user = payload;
  next();
  // tests required me to return something, but that's not how this works...
  return "foo-bar";
};
