exports.createProperty = async (req, res, next) => {
  try {
    res.status(201).json({ message: "Create property" });
  } catch (err) {
    next(err);
  }
};
