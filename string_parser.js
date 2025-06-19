import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const prompt = ChatPromptTemplate.fromTemplate(
  "Give me the net worth of {person}"
);
const parser = new StringOutputParser();
const chain = prompt.pipe(model).pipe(parser);

const result = await chain.invoke({ person: "Tim Cook" });
console.log(result);
