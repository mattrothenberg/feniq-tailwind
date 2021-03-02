import React from "react";
import { AccordionPanel } from "@reach/accordion";

export const FilterAccordionPanel: React.FC = ({ children }) => {
  return (
    <AccordionPanel className="px-4 pb-4 pt-2 focus:outline-none">
      {children}
    </AccordionPanel>
  );
};
