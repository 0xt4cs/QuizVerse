const Score = require("../models/Score");
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateScore = [
  body('score')
    .isNumeric()
    .withMessage('Score must be a number')
    .isFloat({ min: 0 })
    .withMessage('Score must be a positive number'),
  body('difficulty')
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Difficulty must be one of: easy, medium, hard'),
];

const saveOrUpdateScore = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }

  const { score, difficulty } = req.body;

  try {
    const userId = req.user.id; 

    let userScore = await Score.findOne({ userId });

    if (!userScore) {
      userScore = new Score({
        userId,
        scores: [{ category: difficulty, score, retakeCount: 1 }],
      });
      await userScore.save();
      return res.status(201).json({
        success: true,
        message: "Score saved successfully",
        retakeCount: 1,
      });
    } else {
      const existingScore = userScore.scores.find(
        (item) => item.category === difficulty
      );

      if (existingScore) {
        existingScore.score = score; 
        existingScore.retakeCount += 1;
      } else {
        userScore.scores.push({ category: difficulty, score, retakeCount: 1 });
      }

      await userScore.save();

      return res.status(200).json({
        success: true,
        message: "Score updated and retake count incremented",
        retakeCount: existingScore ? existingScore.retakeCount : 1,
      });
    }
  } catch (error) {
    console.error("Error saving/updating score:", error.message);
    res.status(500).json({ success: false, message: "Failed to save or update score" });
  }
};

module.exports = {
  saveOrUpdateScore,
  validateScore, // Export validation middleware
}; 