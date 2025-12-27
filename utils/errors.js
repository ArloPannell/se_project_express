const {
  BADREQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOTFOUND,
  CONFLICT,
  SERVERERROR,
  DBCONFLICT,
} = require("../utils/config");

const errorHandler = (err, res) => {
  if (err.message === "ValidationError") {
    return res
      .status(BADREQUEST)
      .send({ message: `Validation Error: ${err.message}` });
  }
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(NOTFOUND)
      .send({ message: "Requested resource not found" });
  }

  if (err.name === "CastError") {
    return res
      .status(BADREQUEST)
      .send({ message: `Cast Error: ${err.message}` });
  }
  if (err.code === DBCONFLICT) {
    return res
      .status(CONFLICT)
      .send({ message: `Conflict Error: ${err.message}` });
  }
  if (err.code === UNAUTHORIZED) {
    return res.status(UNAUTHORIZED).send({ message: err.message });
  }
  if (err.statusCode === FORBIDDEN) {
    return res.status(FORBIDDEN).send({ message: err.message });
  }
  if (err.statusCode === BADREQUEST) {
    return res.status(BADREQUEST).send({ message: err.message });
  }
  return res.status(SERVERERROR).send({
    message: `General: An error has occurred on the server - ${err.name}`,
  });
};

module.exports = errorHandler;
