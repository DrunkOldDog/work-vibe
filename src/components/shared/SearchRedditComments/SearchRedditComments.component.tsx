import Image from "next/image";

import type { RedditComment } from "@/types";

interface SearchRedditCommentsProps {
  redditCommentData: RedditComment[] | undefined;
}

export default function SearchRedditComments({
  redditCommentData,
}: SearchRedditCommentsProps) {
  if (!redditCommentData) return null;
  return (
    <div className="w-fit min-w-[280px] mb-2 border border-gray-200 rounded-md px-4 py-2 shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex items-center gap-2">
        <Image src="/reddit.webp" alt="Reddit" width={16} height={16} />
        <h3 className="text-sm font-bold">
          Reddit Comments Analyzed: {redditCommentData.length}
        </h3>
      </div>
    </div>
  );
}
