import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const movieSchema = z.object({
  title: z.string().describe("The title of the movie."),
  director: z.string().describe("The director of the movie."),
  release_year: z.number().describe("The year the movie was released."),
});

const parser = StructuredOutputParser.fromZodSchema(movieSchema);

const prompt = ChatPromptTemplate.fromTemplate(
  "Analyze the following movie review and extract the movie details.\n\n{format_instructions}\n\nReview:\n{review}"
);

const chain = prompt.pipe(model).pipe(parser);

const result = await chain.invoke({
  review:
    "I just watched Inception, a mind-bending film by Christopher Nolan from 2010. It was incredible!",
  format_instructions: parser.getFormatInstructions(),
});

console.log(result);
