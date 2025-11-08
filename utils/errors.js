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
  return res.status(500).send({
    message: `General: An error has occurred on the server - ${err.message}`,
  });
};

module.exports = errorHandler;
