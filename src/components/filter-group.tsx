import React from "react";

interface FilterGroupProps {
  label: React.ReactNode;
}
export const FilterGroup: React.FC<FilterGroupProps> = ({
  label,
  children,
}) => {
  return (
    <div>
      <div className="mb-1">
        <p className="text-xs font-medium text-gray-500">{label}</p>
      </div>
      <div className="flex items-center space-x-2 flex-wrap">{children}</div>
    </div>
  );
};
