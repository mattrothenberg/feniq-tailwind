import React from "react";
import { Accordion, AccordionItem, AccordionPanel } from "@reach/accordion";
import {
  RiBuilding4Fill,
  RiFolderUserFill,
  RiFoldersFill,
  RiCalendarTodoFill,
} from "react-icons/ri";
import { FilterAccordionButton } from "./filter-accordion-button";
import { FilterGroup } from "./filter-group";
import { FilterAccordionPanel } from "./filter-accordion-panel";
import { InputGroup } from "./input-group";
import { Input } from "./input";
import { Badge } from "./badge";
import { Select, Option } from "./select";
import { BOOLEAN_SELECT_OPTIONS, BOROUGH_SELECT_OPTIONS } from "../lib";
import { Multiselect } from "./multiselect";

export function Sidebar() {
  const [selected, setSelected] = React.useState<Option | null>(null);
  const [selectedBoroughs, setSelectedBoroughs] = React.useState<
    Option[] | undefined
  >([]);

  const handleSelectedItemChange = (option: Option | null | undefined) => {
    if (option) {
      setSelected(option);
    } else {
      setSelected(null);
    }
  };

  const handleBoroughChange = (boroughs: Option[] | null | undefined) => {
    console.log("made it");
    if (boroughs) {
      setSelectedBoroughs(boroughs);
    } else {
      setSelectedBoroughs([]);
    }
  };

  return (
    <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200 overflow-auto">
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
              <div className="space-y-4">
                <InputGroup
                  id="street-address"
                  label="Street Address"
                  description="You enter the address, duh"
                >
                  <Input
                    id="street-address"
                    placeholder="Enter street address"
                  ></Input>
                </InputGroup>
                <InputGroup
                  id="landmarked"
                  label="Landmarked"
                  description="Is the building landmarked?"
                >
                  <Select
                    selectedItem={selected}
                    onSelectedItemChange={(changes) =>
                      handleSelectedItemChange(changes.selectedItem)
                    }
                    items={BOOLEAN_SELECT_OPTIONS}
                  />
                </InputGroup>
                <InputGroup
                  id="borough"
                  label="Borough"
                  description="What borough is the property in?"
                >
                  <Multiselect
                    selectedItems={selectedBoroughs}
                    onSelectedItemsChange={(changes) => {
                      handleBoroughChange(changes.selectedItems);
                    }}
                    items={BOROUGH_SELECT_OPTIONS}
                  />
                </InputGroup>
              </div>
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
