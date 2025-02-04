const express = require("express");
const agentController = require("../controllers/agent-controllers");
const router = express.Router();

router.get("/property/list");
router.post("/property", agentController.createProperty);
router.put("/property/:propertyId");
router.delete("/property/:propertyId");

module.exports = router;
