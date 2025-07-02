import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const run = async () => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You're a helpful assistant." },
      { role: "user", content: "Give feedback on this sentence: I has an idea." },
    ],
  });

  console.log(response.choices[0].message.content);
};

run();
