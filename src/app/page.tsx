"use client";

import { ChatResult } from "@/components/shared/ChatResult";
import { MotionInput } from "@/components/shared/MotionInput";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage } = useChat();

  const inputAndChatContainerClasses = "w-full max-w-3xl";

  return (
    <div className="container mx-auto px-4 sm:px-0 min-h-screen py-10">
      <div className="flex flex-col gap-10 justify-center items-center mt-40 mb-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold sm:text-8xl">
            AI-Powered Company <br /> Vibe Checker
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mt-4">
            Thinking of applying somewhere? Our AI checks the reviews and
            reveals if it&apos;s good vibes 😎 or red flags 🚩.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput("");
          }}
          className={cn("flex gap-3", inputAndChatContainerClasses)}
        >
          <MotionInput
            required
            value={input}
            animatedPlaceholders={[
              "Software Engineer at Google...",
              "Frontend Engineer at Meta...",
              "Backend Engineer at Apple...",
              "Full Stack Engineer at Amazon...",
              "DevOps Engineer at Microsoft...",
              "Data Scientist at Tesla...",
              "Product Manager at Airbnb...",
              "UX Designer at Spotify...",
            ]}
            className="h-10 sm:h-12 sm:h-12 w-full shadow-md dark:shadow-lg dark:shadow-white/5 border border-gray-200 dark:border-gray-800"
            onChange={(e) => setInput(e.currentTarget.value)}
          />

          <Button type="submit" className="cursor-pointer min-w-20 h-10 sm:h-12">
            Check Vibe
          </Button>
        </form>
      </div>

      <div className="flex justify-center items-center">
        {messages.length > 0 && (
          <div className={inputAndChatContainerClasses}>
            <ChatResult
              messages={messages}
              isStreaming={status === "streaming"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
