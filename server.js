import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Je bent een professionele sierplant expert." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();

    res.json({
      answer: data.choices?.[0]?.message?.content || "Geen antwoord ontvangen."
    });

  } catch (error) {
    res.status(500).json({ error: "Server fout" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server draait op poort " + PORT);
});
