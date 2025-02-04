const express = require("express");
const router = express.Router();

router.get("/agent/list");
router.post("/agent");
router.put("/agent/:agentId");
router.delete("/agent/:agentId");

module.exports = router;
