import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const embedding = new GoogleGenerativeAIEmbeddings({
  modelName: "text-embedding-004",
});

const text = "Who is considered to be as God of cricket?";

const documents = [
  "Who is considered to be as God of cricket?",
  "Who is considered as King of cricket?",
];

const result = await embedding.embedQuery(text);
console.log(result.toString());

const result_doc = await embedding.embedDocuments(documents);
console.log(result_doc);
