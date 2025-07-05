const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { saveOrUpdateScore, validateScore } = require("../controllers/scoreController");

const router = express.Router();

// Route to handle saving or updating scores with validation
router.post("/", authMiddleware, validateScore, saveOrUpdateScore);

module.exports = router;
