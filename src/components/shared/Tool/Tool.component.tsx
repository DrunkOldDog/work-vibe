import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

import { DotsPulse } from "./components";

interface ToolProps {
  children: React.ReactNode;
  isLoading?: boolean;
  toolType?: "reddit";
}

export default function Tool({
  isLoading,
  children,
  toolType = "reddit",
}: ToolProps) {
  const getIcon = () => {
    switch (toolType) {
      case "reddit":
        return <Image src="/reddit.webp" alt="Reddit" width={16} height={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "w-4 min-w-[100px] mb-2 border border-gray-200 rounded-md px-4 py-2 shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300",
        !isLoading && "min-w-[280px]"
      )}
    >
      <div className="flex items-center gap-2">
        {getIcon()}

        {isLoading ? (
          <DotsPulse />
        ) : (
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-bold whitespace-nowrap"
          >
            {children}
          </motion.h3>
        )}
      </div>
    </div>
  );
}
