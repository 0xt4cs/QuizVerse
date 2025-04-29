const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const quizController = require("../controllers/quizController");

router.get("/:difficulty", authMiddleware, quizController.getQuizByDifficulty);

module.exports = router;
    