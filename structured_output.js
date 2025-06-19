import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();
import z from "zod";

const movieSchema = z.object({
  title: z.string().describe("The title of the movie"),
  year: z.number().describe("The year the movie was released"),
  review: z.string().describe("The review of the movie in short"),
  rating: z.number().describe("The rating of the movie"),
  director: z.string().describe("The director of the movie"),
  experience: z
    .string()
    .describe(
      "The experience of the movie stating whether the user liked the movie or not in either of the two words pos or neg"
    ),
});

// const prompt =
//   "Christopher Nolan’s Inception stands as a masterclass in intellectual blockbuster filmmaking, marrying labyrinthine science-fiction concepts with pulse-pounding emotional stakes. Cobb’s quest—to plant an idea in the subconscious mind of a ruthless heir—serves as the scaffolding for a heist film played out across dreamscapes that fold, fracture, and defy Euclidean geometry. Each layer of dreaming is meticulously designed: the rain‑soaked city chase, the zero‑gravity hotel corridor, the snowy fortress of the mind—visual set pieces that dazzle and disorient in equal measure. Yet beneath the dizzying action, Inception is a meditation on grief, guilt, and the inescapable pull of memory. Leonardo DiCaprio’s haunted performance anchors the film’s emotional core: his wife Mal’s tragic specter intrudes on every mission, a shimmering reminder that the greatest prison is the mind itself. Hans Zimmer’s booming, time‑bending score powers the film’s momentum, its trombone blasts echoing the slow‑mo crescendo of collapsing realities. Inception demands the audience’s full engagement, challenging us to question the solidity of our own perceptions even as it delivers blockbuster thrills. It’s a rare hybrid of heady philosophy and kinetic spectacle, leaving you questioning whether you ever truly woke up";

const prompt =
  "James Cameron’s Avatar may have dazzled audiences with its groundbreaking visual effects and immersive 3D spectacle, but beneath the lush veneer of Pandora lies a disappointingly hollow narrative that feels derivative and emotionally sterile. The plot—a blatant rehash of Dances with Wolves or Pocahontas—follows the tired trope of the “white savior” who learns the ways of a native people only to become their ultimate hero, outshining even the most seasoned among them. The Na’vi, while visually stunning, are underdeveloped as characters, reduced to mystical archetypes rather than complex individuals. The villainous corporate-military antagonists are cartoonishly evil, lacking nuance or believable motivation. Sam Worthington’s lead performance is serviceable at best, often wooden and forgettable amidst the dazzling CGI. Cameron’s world-building is visually rich but thematically shallow, filled with borrowed beats from better science fiction and adventure films. The environmental message, though admirable, is delivered with such heavy-handedness that it feels more like a lecture than storytelling. While Avatar may be a technical milestone, it fails to offer the narrative or emotional depth necessary to make it a truly great film—leaving viewers with little more than a pretty postcard from an imaginary world.";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const structuredModel = model.withStructuredOutput(movieSchema);

const result = await structuredModel.invoke(prompt);

console.log(result);
