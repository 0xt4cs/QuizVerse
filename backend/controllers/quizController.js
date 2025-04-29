const axios = require("axios");

const questionCache = {}; // In-memory cache for questions
const CACHE_DURATION = 10 * 60 * 1000; // Cache duration (10 minutes)

const getQuizByDifficulty = async (req, res) => {
  const { difficulty } = req.params;

  // Check cache first
  if (
    questionCache[difficulty] &&
    Date.now() - questionCache[difficulty].timestamp < CACHE_DURATION
  ) {
    return res
      .status(200)
      .json({ success: true, questions: questionCache[difficulty].data });
  }

  let apiURL;
  switch (difficulty) {
    case "hard":
      apiURL =
        "https://opentdb.com/api.php?amount=30&category=17&difficulty=hard&type=multiple";
      break;
    case "medium":
      apiURL =
        "https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple";
      break;
    case "easy":
      apiURL =
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean";
      break;
    default:
      return res
        .status(400)
        .json({ success: false, message: "Invalid difficulty level" });
  }

  try {
    const response = await axios.get(apiURL);
    const questions = response.data.results;

    // Cache the response
    questionCache[difficulty] = {
      timestamp: Date.now(),
      data: questions,
    };

    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch questions" });
  }
};

module.exports = {
  getQuizByDifficulty,
}; 