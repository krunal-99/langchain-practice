import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const prompt = new PromptTemplate({
  template: "What is this site all about? {docs}",
  inputVariables: ["docs"],
});

const parser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const loader = new CheerioWebBaseLoader(
  "https://supabase.com/docs/guides/database/overview"
);

const docs = await loader.load();

const result = await chain.invoke({
  docs: docs[0].pageContent,
});

console.log(result);
