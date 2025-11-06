import { UIMessage } from "@ai-sdk/react";
import { SearchRedditPosts } from "../SearchRedditPosts";
import { SearchRedditComments } from "../SearchRedditComments";
import { VibeScore } from "../VibeScore";

import type { RedditPost, RedditComment } from "@/types";

interface ChatResultProps {
  messages: UIMessage[];
}

export default function ChatResult({ messages }: ChatResultProps) {
  console.log(messages);

  return (
    <div className="w-full max-w-3xl bg-card border border-border rounded-lg p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      {messages
        .filter((message) => message.role !== "user")
        .map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                case "tool-searchRedditPosts":
                  return (
                    <SearchRedditPosts
                      key={part.toolCallId || `${message.id}-${i}`}
                      redditPostData={part.output as RedditPost[]}
                    />
                  );
                case "tool-searchRedditComments":
                  return (
                    <SearchRedditComments
                      key={part.toolCallId || `${message.id}-${i}`}
                      redditCommentData={part.output as RedditComment[]}
                    />
                  );
                case "tool-getVibeScore":
                  return (
                    <VibeScore
                      key={part.toolCallId || `${message.id}-${i}`}
                      data={
                        part.output as {
                          companyName: string;
                          vibeScore: number;
                        }
                      }
                    />
                  );
              }
            })}
          </div>
        ))}
    </div>
  );
}
