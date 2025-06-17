import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const template = "Provide the list of movies of {actor}";

const prompt = new PromptTemplate({
  template,
  inputVariables: ["actor"],
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const chain = prompt.pipe(model);

const result = await chain.invoke({
  actor: "Daniel Radcliffe",
});

console.log(result.content);
