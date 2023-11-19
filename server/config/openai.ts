import OpenAI from "openai";
import dotenv from "dotenv";

//For env File
dotenv.config({ path: `.env.local`, override: true });
dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
