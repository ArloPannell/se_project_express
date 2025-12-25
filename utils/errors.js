const errorHandler = (err, res) => {
  if (err.message.includes("validation")) {
    return res
      .status(400)
      .send({ message: `Validation Error: ${err.message}` });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: "Requested resource not found" });
  }

  if (err.name === "CastError") {
    return res.status(400).send({ message: `Cast Error: ${err.message}` });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: `Conflict Error: ${err.message}` });
  }
  if (err.code === 401) {
    return res.status(401).send({ message: err.message });
  }
  if (err.statusCode === 403) {
    return res.status(403).send({ message: err.message });
  }
  if (err.statusCode === 400) {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({
    message: `General: An error has occurred on the server - ${err.name}`,
  });
};

module.exports = errorHandler;
