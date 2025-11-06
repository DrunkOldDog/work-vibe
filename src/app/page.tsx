"use client";

import { ChatResult } from "@/components/shared/ChatResult";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  return (
    <div className="container mx-auto min-h-screen py-10">
      <div className="flex flex-col gap-10 justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-8xl font-bold">
            AI-Powered Company <br /> Vibe Checker
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-4">
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
          className="flex gap-3 w-full max-w-md"
        >
          <Input
            required
            value={input}
            placeholder="Enter company name..."
            className="h-10 w-full"
            onChange={(e) => setInput(e.currentTarget.value)}
          />

          <Button type="submit" className="cursor-pointer min-w-20 h-full">
            Ask
          </Button>
        </form>

        <ChatResult messages={messages} />
      </div>
    </div>
  );
}
