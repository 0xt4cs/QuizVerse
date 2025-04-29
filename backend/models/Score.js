const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scores: [
    {
      category: { type: String, required: true },
      score: { type: Number, required: true },
      retakeCount: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Score", scoreSchema);
