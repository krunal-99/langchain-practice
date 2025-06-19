import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableParallel } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const parser = new StringOutputParser();

const frenchConversionTemplate = PromptTemplate.fromTemplate(
  "Convert the following word to French: {word}"
);

const frenchChain = frenchConversionTemplate.pipe(model).pipe(parser);

const oppositeWordTemplate = PromptTemplate.fromTemplate(
  "Give one opposite (antonym) of this word: {word}"
);

const oppositeChain = oppositeWordTemplate.pipe(model).pipe(parser);

const mainChain = new RunnableParallel({
  steps: {
    frenchWord: frenchChain,
    oppositeWord: oppositeChain,
  },
});

const result = await mainChain.invoke({ word: "happy" });

console.log(result);
