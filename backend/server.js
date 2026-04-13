console.log("🚨 THIS SERVER IS RUNNING");
require("./db");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Interview = require("./models/Interview");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ GLOBAL LOGGER
app.use((req, res, next) => {
  console.log("🌐 Incoming:", req.method, req.url);
  next();
});

const API_KEY = process.env.OPENROUTER_API_KEY;

// ✅ ONLY ONE CHAT ROUTE
app.post("/chat", async (req, res) => {
  console.log("🔥 API HIT");

  const userMessage = req.body.message;
  console.log("USER:", userMessage);

  try {
    console.log("👉 Calling AI...");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ AI RESPONSE RECEIVED");

    const aiReply =
      response?.data?.choices?.[0]?.message?.content || "No response";

    console.log("AI REPLY:", aiReply);

    // ✅ SAVE TO DB
    try {
      const newInterview = new Interview({
        question: userMessage,
        answer: aiReply,
        feedback: "Pending",
      });

      await newInterview.save();
      console.log("✅ Saved to DB");
    } catch (err) {
      console.log("❌ DB SAVE ERROR:", err);
    }

    res.json({ reply: aiReply });

  } catch (error) {
    console.log("❌ API ERROR:", error.response?.data || error.message);

    res.json({
      reply: "⚠️ AI failed",
    });
  }
});

// ✅ START SERVER
app.listen(5000, () => {
  console.log("🚀 AI server running on port 5000");
});