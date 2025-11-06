import Image from "next/image";

import type { RedditPost } from "@/types";

interface SearchRedditPostsProps {
  redditPostData: RedditPost[] | undefined;
}

export default function SearchRedditPosts({
  redditPostData,
}: SearchRedditPostsProps) {
  if (!redditPostData) return null;
  return (
    <div className="w-fit min-w-[280px] mb-2 border border-gray-200 rounded-md px-4 py-2 shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex items-center gap-2">
        <Image src="/reddit.webp" alt="Reddit" width={16} height={16} />
        <h3 className="text-sm font-bold">
          Reddit Posts Analyzed: {redditPostData.length}
        </h3>
      </div>
    </div>
  );
}
