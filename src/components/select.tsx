import React from "react";
import { useSelect, UseSelectProps } from "downshift";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Popover } from "react-tiny-popover";

import cc from "classcat";

interface Option {
  label: string;
  value: string | boolean | number;
}

interface SelectProps extends UseSelectProps<Option> {}

export const Select: React.FC<SelectProps> = ({ items, ...rest }) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString: (item) => (item ? item.label : ""),
    ...rest,
  });

  return (
    <div className="relative">
      <button
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type="button"
        {...getToggleButtonProps()}
      >
        <span className="block truncate">
          {selectedItem?.label || (
            <span className="text-gray-500">Select option</span>
          )}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <RiArrowUpDownFill className="h-5 w-5 text-gray-400" />
        </span>
      </button>
      <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
        <ul
          className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => {
              return (
                <li
                  className={cc([
                    "cursor-default select-none relative py-2 pl-3 pr-9",
                    {
                      "text-white bg-indigo-600":
                        highlightedIndex === index ||
                        selectedItem?.value === item.value,
                      "text-gray-900":
                        highlightedIndex !== index &&
                        selectedItem?.value !== item.value,
                    },
                  ])}
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  <span
                    className={cc([
                      "block truncate",
                      {
                        "font-normal": selectedItem?.value !== item.value,
                        "font-semibold": selectedItem?.value === item.value,
                      },
                    ])}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
