import React from "react";
import {
  Button as ReakitButton,
  ButtonProps as ReakitButtonProps,
} from "reakit/Button";
import cc from "classcat";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonVariant = "primary" | "secondary" | "white";

interface ButtonProps extends ReakitButtonProps {
  variant?: ButtonVariant;
  round?: boolean;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const sizeToClassMap: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm leading-4",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2 text-base",
  xl: "px-6 py-3 text-base",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "sm",
  startIcon,
  endIcon,
  ...rest
}) => {
  const buttonClass = cc([
    "inline-flex items-center font-medium rounded",
    sizeToClassMap[size],
    {
      "opacity-75 cursor-not-allowed": rest.disabled,
      "border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500":
        variant === "primary",
      "border border-transparent rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500":
        variant === "secondary",
      "border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500":
        variant === "white",
    },
  ]);

  return (
    <ReakitButton className={buttonClass} {...rest}>
      <div className="flex items-center space-x-2">
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </div>
    </ReakitButton>
  );
};
