const Score = require("../models/Score");

const saveOrUpdateScore = async (req, res) => {
  const { score, difficulty } = req.body;

  // Validate input
  if (score === undefined || !difficulty) {
    return res.status(400).json({
      success: false,
      message: "Score and difficulty are required",
    });
  }

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
    res.status(500).json({ success: false, message: "Failed to save or update score" }); // Generic error message
  }
};

module.exports = {
  saveOrUpdateScore,
}; 