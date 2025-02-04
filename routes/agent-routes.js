const express = require("express");
const agentController = require("../controllers/agent-controllers");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/property/list");
router.post(
  "/property",
  upload.array("propertyImages"),
  agentController.createProperty
);
router.put("/property/:propertyId");
router.delete("/property/:propertyId");

module.exports = router;
