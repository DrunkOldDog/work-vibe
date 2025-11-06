import { TrendingDown, AlertTriangle, TrendingUp } from "lucide-react";

interface VibeScoreProps {
  data:
    | {
        companyName: string;
        vibeScore: number;
      }
    | undefined;
}

export default function VibeScore({ data }: VibeScoreProps) {
  if (!data) return null;

  const getScoreColor = (score: number) => {
    if (score <= 35) {
      return {
        border: "border-red-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        hover: "hover:bg-red-100 dark:hover:bg-red-950/30",
        text: "text-red-700 dark:text-red-400",
        icon: "text-red-600 dark:text-red-500",
        iconComponent: TrendingDown,
      };
    } else if (score > 35 && score <= 70) {
      return {
        border: "border-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        hover: "hover:bg-yellow-100 dark:hover:bg-yellow-950/30",
        text: "text-yellow-700 dark:text-yellow-400",
        icon: "text-yellow-600 dark:text-yellow-500",
        iconComponent: AlertTriangle,
      };
    } else {
      return {
        border: "border-green-500",
        bg: "bg-green-50 dark:bg-green-950/20",
        hover: "hover:bg-green-100 dark:hover:bg-green-950/30",
        text: "text-green-700 dark:text-green-400",
        icon: "text-green-600 dark:text-green-500",
        iconComponent: TrendingUp,
      };
    }
  };

  const colorScheme = getScoreColor(data.vibeScore);
  const Icon = colorScheme.iconComponent;

  return (
    <div
      className={`w-full my-4 border-2 rounded-lg px-4 py-3 shadow-md ${colorScheme.bg} ${colorScheme.hover} transition-colors`}
    >
      <div className="flex items-center gap-3">
        <div className={`${colorScheme.icon} flex-shrink-0`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h1 className={`text-lg font-bold ${colorScheme.text}`}>
              Vibe Score: {data.vibeScore}
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              /100 
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.companyName}
          </p>
        </div>
      </div>
    </div>
  );
}
