import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const parser = new JsonOutputParser();

const prompt = ChatPromptTemplate.fromTemplate(
  "Extract the name and age from the following text. Respond with a JSON object containing 'name' and 'age' keys.\n\nText: {text}"
);

const chain = prompt.pipe(model).pipe(parser);

const result = await chain.invoke({
  text: "My name is Evelyn and I will be 28 next month.",
});

console.log(result);
