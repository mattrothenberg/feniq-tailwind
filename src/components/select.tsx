import React from "react";
import { useSelect, UseSelectProps } from "downshift";
import { RiArrowUpDownFill, RiCheckFill } from "react-icons/ri";
import { usePopper } from "react-popper";

import cc from "classcat";

interface Option {
  label: string;
  value: string | boolean | number;
}

interface SelectProps extends UseSelectProps<Option> {}

export const Select: React.FC<SelectProps> = ({ items, ...rest }) => {
  const [
    referenceElement,
    setReferenceElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 4],
          },
        },
      ],
    }
  );

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

  // Popper has the wrong position on mount, this hack seems to fix it...
  React.useEffect(() => {
    if (isOpen && forceUpdate) {
      forceUpdate();
    }
  }, [isOpen, forceUpdate]);

  return (
    <div className="relative" ref={setReferenceElement}>
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
      <div
        className={cc([
          "w-full",
          {
            "sr-only": !isOpen,
          },
        ])}
        style={styles.popper}
        ref={setPopperElement}
        {...attributes.popper}
      >
        <div className="mt-1 w-full rounded-md bg-white shadow-lg max-h-48">
          <ul
            className="rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm max-h-48 overflow-auto"
            {...getMenuProps()}
          >
            {items.map((item, index) => {
              const isHighlighted = highlightedIndex === index;
              const isSelected = selectedItem?.value === item.value;
              return (
                <li
                  className={cc([
                    "cursor-default select-none relative py-2 pl-3 pr-9 text-sm",
                    {
                      "text-white bg-indigo-600": isHighlighted,
                      "text-gray-900": !isHighlighted && !isSelected,
                    },
                  ])}
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  <span
                    className={cc([
                      "block truncate",
                      {
                        "font-normal": !isSelected,
                        "font-semibold": isSelected,
                      },
                    ])}
                  >
                    {item.label}
                  </span>

                  {selectedItem?.value === item.value && (
                    <span
                      className={cc([
                        "absolute inset-y-0 right-0 flex items-center pr-4",
                        {
                          "text-indigo-600": !isHighlighted,
                          "text-white": isHighlighted,
                        },
                      ])}
                    >
                      <RiCheckFill className="h-5 w-5" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
