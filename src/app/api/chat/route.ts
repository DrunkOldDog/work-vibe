import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";

import { searchRedditPosts, searchRedditComments, getVibeScore } from "./tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    // model: openai("gpt-4o-mini"), // Or whichever model you prefer
    system: `You are a helpful assistant that analyzes company culture and work environment by searching Reddit.
    Follow these steps EXACTLY in order:
    1. First, use searchRedditPosts to search for posts about the company.
    2. From the search results, identify the top 3 most relevant posts that discuss reviews, experiences, or work culture at the company. Prioritize posts with higher scores and more comments.
    3. For each of those top 3 posts, use searchRedditComments with the post's subreddit and postId to get the comments (use maxComments=50 for each).
    4. After analyzing all posts and comments, use the getVibeScore tool exactly ONCE to provide the final vibe score (0-100) based on the overall sentiment.

    Important rules:
    - Always call searchRedditComments for the top 3 posts you identified, which should be related to job reviews, experiences, or work culture at the company.
    - Call getVibeScore only once at the very end with your final assessment
    - If no relevant information is found, still call getVibeScore with a neutral score (50)
    - Provide a brief summary of the company culture and work environment based on the posts and comments, and the finish with the getVibeScore tool.`,
    messages: convertToModelMessages(messages),
    tools: {
      searchRedditPosts,
      searchRedditComments,
      getVibeScore,
      // TODO: Add more tools here
      // Example:
      // searchGlassdoorReviews
      // searchGoogleReviews
    },
    stopWhen: stepCountIs(10), // Allow enough steps: 1 searchPosts + 3 searchComments + 1 getVibeScore = 5 minimum
  });

  return result.toUIMessageStreamResponse();
}
