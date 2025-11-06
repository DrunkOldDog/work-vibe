import { tool } from "ai";
import { z } from "zod";

export const getVibeScore = tool({
  description: "Provide the final vibe score for a company based on all collected Reddit posts and comments. This should be called exactly ONCE at the end after analyzing all posts and comments. Score range: 0-100 (0 = very negative, 50 = neutral, 100 = very positive).",
  inputSchema: z.object({
    companyName: z
      .string()
      .describe("The name of the company being analyzed"),
    vibeScore: z.number().min(0).max(100).describe("The vibe score from 0 to 100 based on overall sentiment from Reddit posts and comments"),
  }),
  execute: async ({ companyName, vibeScore }) => {
    return {
      vibeScore,
      companyName,
    };
  },
});
