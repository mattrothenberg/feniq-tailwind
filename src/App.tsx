import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useAccordionItemContext,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function Header() {
  return (
    <header className="h-16 bg-gray-900 flex flex-shrink-0 px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          FenIQ
        </h1>
      </div>
    </header>
  );
}

const FilterAccordionButton: React.FC = ({ children }) => {
  const context = useAccordionItemContext();
  const icon = context.isExpanded ? <FiChevronUp /> : <FiChevronDown />;

  return (
    <AccordionButton className="w-full text-left h-10 hover:bg-gray-100 focus:outline-none focus:ring px-4">
      <div className="flex items-center justify-between">
        <span>{children}</span>
        {icon}
      </div>
    </AccordionButton>
  );
};

function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
          Applied Filters
        </h3>
      </div>
      <div>
        <Accordion className="divide-y" multiple collapsible>
          <AccordionItem>
            <FilterAccordionButton>Building Information</FilterAccordionButton>
            <AccordionPanel>Stuff goes here</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <FilterAccordionButton>Companies & People</FilterAccordionButton>
            <AccordionPanel>Stuff goes here</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <FilterAccordionButton>Project Information</FilterAccordionButton>
            <AccordionPanel>Stuff goes here</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <FilterAccordionButton>Timelines & Status</FilterAccordionButton>
            <AccordionPanel>Stuff goes here</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-100 flex">
        <Sidebar />
        <main className="flex-1"></main>
      </div>
    </div>
  );
}

export default App;
