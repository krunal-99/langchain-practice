import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const prompt = "Who is the God of cricket?";

const result = await model.invoke(prompt);

console.log(result.content);
