const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const scoreController = require("../controllers/scoreController");

const router = express.Router();

// Route to handle saving or updating scores
router.post("/", authMiddleware, scoreController.saveOrUpdateScore);

module.exports = router;
