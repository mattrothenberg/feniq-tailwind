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
import {
  RiBuilding4Fill,
  RiFolderUserFill,
  RiFoldersFill,
  RiCalendarTodoFill,
} from "react-icons/ri";
import { Input as ReakitInput, InputProps } from "reakit/Input";

function Header() {
  return (
    <header className="h-12 bg-gray-900 flex flex-shrink-0 px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          FenIQ
        </h1>
      </div>
    </header>
  );
}

interface FilterAccordionButtonProps {
  icon?: React.ReactNode;
}

const FilterAccordionButton: React.FC<FilterAccordionButtonProps> = ({
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

interface FilterGroupProps {
  label: React.ReactNode;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ label, children }) => {
  return (
    <div>
      <div className="mb-1">
        <p className="text-xs font-medium text-gray-500">{label}</p>
      </div>
      <div className="flex items-center space-x-2 flex-wrap">{children}</div>
    </div>
  );
};

const FilterAccordionPanel: React.FC = ({ children }) => {
  return (
    <AccordionPanel className="p-4 focus:outline-none">
      {children}
    </AccordionPanel>
  );
};

interface InputGroupProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  id: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  description,
  children,
  id,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-gray-500">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <ReakitInput
      {...props}
      type="text"
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    />
  );
};

function Sidebar() {
  return (
    <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <header className="mb-2">
          <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            Applied Filters
          </h3>
        </header>
        <div className="space-y-4 max-h-64 overflow-y-scroll">
          <FilterGroup label="Borough">
            <Badge onRemove={() => {}}>Manhattan</Badge>
            <Badge onRemove={() => {}}>Bronx</Badge>
            <Badge onRemove={() => {}}>Brooklyn</Badge>
          </FilterGroup>
          <FilterGroup label="Number of Stories">
            <Badge onRemove={() => {}}>Mid-rise</Badge>
          </FilterGroup>
          <FilterGroup label="Little E">
            <Badge onRemove={() => {}}>Yes</Badge>
          </FilterGroup>
        </div>
      </div>
      <div>
        <div className="px-4 pt-4">
          <header className="mb-2">
            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Available Filters
            </h3>
          </header>
        </div>
        <Accordion className="divide-y" multiple collapsible>
          <AccordionItem>
            <FilterAccordionButton icon={<RiBuilding4Fill />}>
              Building Information
            </FilterAccordionButton>
            <FilterAccordionPanel>
              <InputGroup id="street-address" label="Street Address">
                <Input
                  id="street-address"
                  placeholder="Enter street address"
                ></Input>
              </InputGroup>
            </FilterAccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <FilterAccordionButton icon={<RiFolderUserFill />}>
              Companies & People
            </FilterAccordionButton>
            <AccordionPanel>Stuff goes here</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <FilterAccordionButton icon={<RiFoldersFill />}>
              Project Information
            </FilterAccordionButton>
            <AccordionPanel>Stuff goes here</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <FilterAccordionButton icon={<RiCalendarTodoFill />}>
              Timelines & Status
            </FilterAccordionButton>
            <AccordionPanel>Stuff goes here</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}

interface BadgeProps {
  onRemove: () => void;
}

const Badge: React.FC<BadgeProps> = ({ children, onRemove }) => {
  return (
    <span className="inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
      {children}
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
      >
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

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-200 flex">
        <Sidebar />
        <main className="flex-1"></main>
      </div>
    </div>
  );
}

export default App;
