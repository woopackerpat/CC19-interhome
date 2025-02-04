const express = require("express");
const adminController = require("../controllers/admin-controllers");
const router = express.Router();

router.get("/agent/list");
router.post("/agent", adminController.createAgent);
router.put("/agent/:agentId");
router.delete("/agent/:agentId");

module.exports = router;
