const Score = require("../models/Score");

const getCategoryLeaderboard = async (category) => {
  // This function fetches and formats the leaderboard for a single category
  return Score.aggregate([
    { $unwind: "$scores" },
    { $match: { "scores.category": category } },
    { $sort: { "scores.score": -1 } },
    { $limit: 10 }, // Limit to top 10 scores
    {
      $lookup: {
        from: "users", // The collection to join with
        localField: "userId", // Field from the scores collection
        foreignField: "_id", // Field from the users collection
        as: "userDetails", // Output array field
      },
    },
    { $unwind: "$userDetails" }, // Deconstruct the userDetails array
    {
      $project: {
        // Select and rename fields for the final output
        _id: 0, // Exclude the default _id
        name: "$userDetails.name",
        score: "$scores.score",
        retakeCount: "$scores.retakeCount",
      },
    },
  ]);
};

const getLeaderboard = async (req, res) => {
  try {
    const categories = ["easy", "medium", "hard"];
    const leaderboard = {};

    // Fetch leaderboard data for all categories concurrently
    await Promise.all(
      categories.map(async (category) => {
        leaderboard[category] = await getCategoryLeaderboard(category);
      })
    );

    res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ success: false, message: "Failed to fetch leaderboard due to an internal server error" });
  }
};

module.exports = {
  getLeaderboard,
}; 