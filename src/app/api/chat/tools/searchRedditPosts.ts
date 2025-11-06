import { tool } from "ai";
import { z } from "zod";

export const searchRedditPosts = tool({
  description: "Search for Reddit posts about a company. This is the first step - search for posts, then identify the top 3 most relevant ones to get comments from. Returns posts with id, subreddit, title, selftext, score, and num_comments fields.",
  inputSchema: z.object({
    query: z.string().describe("The company name to search for on Reddit"),
    limit: z.number().optional().describe("The number of posts to return (recommended: 25)"),
  }),
  execute: async ({ query, limit }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reddit/posts?q=${query}&limit=${limit}`
    );
    const data = await response.json();
    return data.posts;
  },
});
