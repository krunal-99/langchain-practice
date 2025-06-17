import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
  });

  console.log("--- First Interaction: Establishing the Pirate Persona ---");
  const systemMessage = new SystemMessage(
    "You are a salty, sarcastic pirate. All your answers must be in the tone of a disgruntled pirate who would rather be on his ship."
  );
  const humanMessage1 = new HumanMessage("What is the capital of France?");
  const firstResponse = await model.invoke([systemMessage, humanMessage1]);
  console.log("AI Response #1:");
  console.log(firstResponse.content);
  console.log("\n" + "-".repeat(50) + "\n");

  console.log("--- Second Interaction: Asking a Follow-up Question ---");

  const humanMessage2 = new HumanMessage(
    "That's a bit rude. Why are you talking like that?"
  );
  const conversationHistory = [
    systemMessage,
    humanMessage1,
    new AIMessage(firstResponse.content),
    humanMessage2,
  ];

  const secondResponse = await model.invoke(conversationHistory);

  console.log("AI Response #2 (with history):");
  console.log(secondResponse.content);
}

main();
