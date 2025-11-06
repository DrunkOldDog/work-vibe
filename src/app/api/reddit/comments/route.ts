import { NextResponse } from "next/server";
import { flattenComments } from "../utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subreddit = searchParams.get("subreddit");
  const postId = searchParams.get("postId");
  const maxComments = parseInt(searchParams.get("maxComments") || "10", 10);

  if (!subreddit || !postId) {
    return NextResponse.json(
      {
        error: "Missing required parameters: subreddit and postId are required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postId}/.json?limit=${maxComments}`,
      {
        headers: {
          "User-Agent": "WorkVibe/1.0",
          Authorization: `Basic ${btoa(
            process.env.REDDIT_CLIENT_ID +
              ":" +
              process.env.REDDIT_CLIENT_SECRET
          )}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    // Reddit returns [post_data, comments_data]
    const commentsData = data[1]?.data?.children || [];
    const comments = flattenComments(commentsData, maxComments);

    return NextResponse.json({
      subreddit,
      postId,
      commentsCount: comments.length,
      maxComments,
      comments,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch comments",
      },
      { status: 500 }
    );
  }
}
