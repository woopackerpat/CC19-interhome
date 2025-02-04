const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return createError(400, "Email and password should be provided");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return createError(400, "Invalid type of email or password");
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return createError(400, "User not found");
    }

    if (user.role === "ADMIN") {
      if (password !== user.password) {
        return createError(401, "Unauthorized");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.json({ token });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return createError(400, "Email or password is invalid");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
