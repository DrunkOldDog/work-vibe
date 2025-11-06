"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function streamTest() {
  const result = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: "Hello, how are you? What is the capital of France?",
  });

  console.log(result.text);
  return result.text;
}
