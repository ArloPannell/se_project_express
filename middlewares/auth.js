const jwt = require("jsonwebtoken");
const { JWT_SECRET, UNAUTHORIZED } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (
    !authorization ||
    !(
      authorization.startsWith("Bearer ") || authorization.startsWith("bearer ")
    )
  ) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  const token = authorization.replace(/^[Bb]earer\s+/, "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  req.user = payload;
  next();

  return "Github Actions requires a return at the end of this function, but it's not needed";
};
