import React from "react";
import {
  useCombobox,
  useMultipleSelection,
  UseComboboxProps,
  UseMultipleSelectionProps,
} from "downshift";
import { usePopper } from "react-popper";
import cc from "classcat";
import Highlighter from "react-highlight-words";

import { Option } from "./select";
import { matchSorter } from "match-sorter";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Badge } from "./badge";

function filterFunc(items: Option[], inputValue: string) {
  return matchSorter(items, inputValue, { keys: ["value", "label"] });
}

interface MultiselectProps
  extends UseMultipleSelectionProps<Option>,
    Pick<UseComboboxProps<Option>, "items"> {}

export const Multiselect: React.FC<MultiselectProps> = (props) => {
  const { items, selectedItems, ...downshiftProps } = props;
  const [inputItems, setInputItems] = React.useState(items);

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

  const selectedItemValues = selectedItems?.map((item) => item.value);

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
  } = useMultipleSelection({
    ...downshiftProps,
    selectedItems,
    // @ts-ignore
    stateReducer: (_, actionAndChanges) => {
      const { type, changes } = actionAndChanges;
      switch (type) {
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          return {
            ...changes,
            activeIndex: null,
          };
        default:
          return changes;
      }
    },
  });

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    openMenu,
    inputValue,
  } = useCombobox({
    defaultHighlightedIndex: 0,
    selectedItem: null,
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      const filteredItems = filterFunc(items, inputValue || "");
      setInputItems(filteredItems);
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: "",
          };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            isOpen: true,
            inputValue: "",
          };
        default:
          return changes;
      }
    },
    onStateChange: ({ type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItemValues?.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem);
            } else {
              addSelectedItem(selectedItem);
            }

            // @ts-ignore
            selectItem(null);
          }
          break;
        default:
          break;
      }
    },
  });

  React.useEffect(() => {
    if (isOpen && forceUpdate) {
      forceUpdate();
    }
  }, [isOpen, forceUpdate]);

  return (
    <div>
      {selectedItems && selectedItems.length > 0 && (
        <div className="selected-items flex flex-wrap mb-3">
          {selectedItems?.map((selectedItem, index) => (
            <div
              key={`selected-item-${index}`}
              className="mb-1 first:ml-0 ml-1"
            >
              <Badge
                {...getSelectedItemProps({ selectedItem, index })}
                variant="secondary"
                onRemove={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(selectedItem);
                }}
              >
                {selectedItem.label}
              </Badge>
            </div>
          ))}
        </div>
      )}
      <div className="relative" ref={setReferenceElement}>
        <div className="relative" {...getComboboxProps()}>
          <input
            {...getInputProps(
              getDropdownProps({
                className:
                  "bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm z-0",
                placeholder: "Select multiple",
                onClick: isOpen ? () => {} : openMenu,
                onFocus: isOpen ? () => {} : openMenu,
              })
            )}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <RiArrowUpDownFill className="h-5 w-5 text-gray-400" />
          </span>
        </div>
        <div
          className={cc([
            "w-full bg-white rounded-md bg-white shadow-lg z-10",
            {
              "sr-only": !isOpen,
            },
          ])}
          style={styles.popper}
          ref={setPopperElement}
          {...attributes.popper}
        >
          <div className="max-h-48">
            <ul {...getMenuProps()}>
              {inputItems.map((item, index) => {
                const isHighlighted = highlightedIndex === index;
                const isSelected = selectedItemValues?.includes(item.value);

                return (
                  <li
                    className={cc([
                      "cursor-default select-none relative py-2 pl-3 pr-9 text-sm flex items-center space-x-2",
                      {
                        "text-white bg-indigo-600": isHighlighted,
                        "text-gray-900": !isHighlighted && !isSelected,
                      },
                    ])}
                    key={`${item}${index}`}
                    {...getItemProps({ item, index })}
                  >
                    <input
                      checked={isSelected}
                      readOnly
                      className={cc([
                        "pointer-events-none focus:ring-indigo-500 h-4 w-4 rounded",
                        {
                          "text-indigo-600": !isHighlighted,
                          "text-indigo-500": isHighlighted,
                        },
                      ])}
                      type="checkbox"
                    />
                    <Highlighter
                      autoEscape
                      searchWords={[inputValue || ""]}
                      textToHighlight={item.label}
                      highlightClassName="bg-yellow-200"
                    ></Highlighter>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
