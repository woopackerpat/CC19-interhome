const express = require("express");
const router = express.Router();

router.post("/login");
router.post("/forget-password");
router.post("/reset-password");

module.exports = router;
