import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const template = "Bring me the career stats of {player}";

const prompt = new PromptTemplate({
  template,
  inputVariables: ["player"],
});

const formattedPrompt = await prompt.format({
  player: "Jasprit Bumrah",
});

console.log(`Prompt generated: ${formattedPrompt}`);

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const result = await model.invoke(formattedPrompt);
console.log(result.content);
