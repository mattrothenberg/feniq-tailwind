import React from "react";
import cc from "classcat";

type BadgeVariant = "primary" | "secondary";

interface BadgeProps {
  onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: BadgeVariant;
}
export const Badge: React.FC<BadgeProps> = ({
  children,
  onRemove,
  variant = "primary",
}) => {
  const wrapClass = cc([
    "inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium",
    {
      "bg-indigo-100 text-indigo-700": variant === "primary",
      "bg-gray-100 text-gray-700": variant === "secondary",
    },
  ]);

  const buttonClass = cc([
    "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center",
    {
      "text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white":
        variant === "primary",
      "text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-500 focus:text-white":
        variant === "secondary",
    },
  ]);

  return (
    <span className={wrapClass}>
      {children}
      <button type="button" onClick={onRemove} className={buttonClass}>
        <span className="sr-only">Remove filter</span>
        <svg
          className="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
  );
};
