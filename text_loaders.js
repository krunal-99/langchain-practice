import { TextLoader } from "langchain/document_loaders/fs/text";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const prompt = new PromptTemplate({
  template: "Generate a summary for this text - {text}",
  inputVariables: ["text"],
});

const parser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const loader = new TextLoader("demo.txt");

const docs = await loader.load();

const result = await chain.invoke({
  text: docs[0].pageContent,
});

console.log(result);
