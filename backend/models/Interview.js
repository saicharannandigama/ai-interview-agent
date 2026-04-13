const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  question: String,
  answer: String,
  feedback: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Interview", interviewSchema);