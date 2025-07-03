
import axios from "axios";
import Feedback from "../models/Feedback.js";

export const getFeedback = async (req, res) => {
  const { input, tone = "concise" } = req.body;

  if (typeof input !== "string" || input.trim() === "") {
    return res.status(400).json({ error: "Input must be a non-empty string" });
  }

  // Tone-to-prompt mapping with improved markdown structure
  const tonePrompts = {
    concise: `You are a concise communication coach. When given a user's question, return feedback in markdown format with the following structure:

### Feedback on the Question

**Strengths**
- One specific positive point

**Improvements**
- Two specific suggestions

**Optional Revision**
- Suggest one clear sentence that rephrases the question

Rules:
- Use proper markdown formatting
- Be direct and objective
- Avoid motivational fluff or emojis
- Limit to 80–100 words.`,

    detailed: `You are a detailed feedback mentor. Return feedback in markdown format using this structure:

### Feedback on the Question

**Strengths**
- Point 1
- Point 2

**Areas for Improvement**
- Issue 1
- Issue 2

**Suggestions**
- Suggestion 1
- Suggestion 2

**Revised Question**
- A rephrased version of the input question

Be helpful, use friendly language, and limit to ~200 words.`,

    strict: `You are a strict evaluator. Provide formal feedback in markdown with this structure:

### Feedback on the Question

**What’s Good**
- Point 1

**What's Lacking**
- Issue 1
- Issue 2

**Fix Suggestion**
- A rewritten version of the question

No fluff, praise, emojis, or motivation. Be blunt. Max 100 words.`,

    friendly: `You are a friendly assistant. Use markdown and a casual tone:

### Feedback on the Question

**Nice Job!**
- Point 1

**Room to Improve**
- Suggestion 1
- Suggestion 2

**Try This Instead**
- Reworded question

End with a positive line like: "You're doing great — keep asking!" Limit to 120 words.`,

    formal: `You are a formal academic reviewer. Return markdown formatted feedback like this:

### Feedback on the Question

**Strengths**
- Academic strength

**Weaknesses**
- Technical weakness

**Recommendations**
- Recommendation 1
- Recommendation 2

Use formal, objective language. Be respectful but serious. Limit to 150 words.`
  };

  const gwaliorContext = `
You are specialized in the city of Gwalior (Madhya Pradesh, India). You know its geography, history, education, culture, startups, and public places.
Always provide feedback considering Gwalior-specific context. If the question relates to another region, politely redirect to Gwalior.
`;

  const systemPrompt = `${gwaliorContext}\n\n${tonePrompts[tone] || tonePrompts["concise"]}`;

  try {
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Give feedback on this question: "${input}"`
          }
        ],
        temperature: 0.4,
        max_tokens: 300 // Adjust this if output is too long or too short
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    const feedback = groqRes?.data?.choices?.[0]?.message?.content || "No feedback generated.";

    const entry = new Feedback({ user_input: input, feedback, tone });
    await entry.save();

    res.json({ feedback });

  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch feedback from Groq API" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error("Error fetching history:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
