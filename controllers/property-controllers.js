exports.getPropertyList = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Get property List" });
  } catch (err) {
    next(err);
  }
};
