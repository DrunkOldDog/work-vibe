import { tool } from "ai";
import { z } from "zod";

import type { RedditComment } from "@/types";

export const searchRedditComments = tool({
  description: "Retrieve comments from a specific Reddit post. Use this after identifying relevant posts from searchRedditPosts to get detailed user experiences and reviews in the comments. Each post has a subreddit and id field that you should use.",
  inputSchema: z.object({
    subreddit: z.string().describe("The subreddit name from the post (e.g., 'cscareerquestions', 'jobs')"),
    postId: z.string().describe("The post id from the searchRedditPosts results"),
    maxComments: z.number().optional().describe("The maximum number of comments to return (recommended: 50)"),
  }),
  execute: async ({ subreddit, postId, maxComments }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reddit/comments?subreddit=${subreddit}&postId=${postId}&maxComments=${maxComments}`
    );
    const data = await response.json();
    return data.comments.map((comment: RedditComment) => comment.body);
  },
});
