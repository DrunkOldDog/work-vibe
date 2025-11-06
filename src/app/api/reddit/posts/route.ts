import { NextResponse } from "next/server";
import { extractPostData } from "../utils";

import type { RedditPostQueryData } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const limit = searchParams.get("limit") || "25";

  if (!query) {
    return NextResponse.json(
      { error: "Missing required parameter: q" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(
        query
      )}&sort=relevance&limit=${limit}`,
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

    // Extract only relevant fields from each post
    const posts =
      data.data?.children?.map((child: RedditPostQueryData) =>
        extractPostData(child.data)
      ) || [];

    return NextResponse.json({
      query,
      totalResults: posts.length,
      posts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch Reddit posts",
      },
      { status: 500 }
    );
  }
}
