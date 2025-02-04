const express = require("express");
const authController = require("../controllers/auth-controllers");
const router = express.Router();

router.post("/login", authController.login);
router.post("/forget-password");
router.post("/reset-password");

module.exports = router;
