const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const { transcript } = req.body;

  try {

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that analyzes sales call transcripts. Return the result in this format:\n\nSummary:\nKey Objection:\nCustomer Intent:\nSentiment:\nNext Step:"
          },
          {
            role: "user",
            content: transcript
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiResult = response.data.choices[0].message.content;

    res.json({ result: aiResult });

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to analyze transcript" });
  }
});

module.exports = router;