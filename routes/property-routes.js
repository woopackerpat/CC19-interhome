const express = require("express");
const propertyController = require("../controllers/property-controllers");
const router = express.Router();

router.get("/list", propertyController.getPropertyList);
router.get("/:propertyId");

module.exports = router;
