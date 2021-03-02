import React from "react";
import { AccordionButton, useAccordionItemContext } from "@reach/accordion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FilterAccordionButtonProps {
  icon?: React.ReactNode;
}
export const FilterAccordionButton: React.FC<FilterAccordionButtonProps> = ({
  icon,
  children,
}) => {
  const context = useAccordionItemContext();
  const indicatorIcon = context.isExpanded ? (
    <FiChevronUp />
  ) : (
    <FiChevronDown />
  );

  return (
    <AccordionButton className="w-full text-left h-10 hover:bg-gray-100 focus:outline-none focus:ring px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>{icon}</span>
          <span className="text-gray-700 font-medium text-sm">{children}</span>
        </div>
        <span className="text-gray-400">{indicatorIcon}</span>
      </div>
    </AccordionButton>
  );
};
