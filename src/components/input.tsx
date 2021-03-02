import React from "react";
import { Input as ReakitInput, InputProps } from "reakit/Input";

export const Input: React.FC<InputProps> = (props) => {
  return (
    <ReakitInput
      {...props}
      type="text"
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    />
  );
};
