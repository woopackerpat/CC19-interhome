const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const prisma = require("../configs/prisma");

exports.createAgent = async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      qrCode,
      profileImage,
    } = req.body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !qrCode ||
      !profileImage
    ) {
      return createError(400, "Please send all info");
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const agent = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        qrCode,
        profileImage,
      },
    });
    res.status(201).json({ agent });
  } catch (err) {
    next(err);
  }
};
