import React from "react";
import { Dialog } from "@reach/dialog";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "react-dates/initialize";
import moment, { Moment } from "moment";
import "@reach/dialog/styles.css";
import "react-dates/lib/css/_datepicker.css";
import { FiCheck } from "react-icons/fi";

import { Button } from "./button";

export interface DateRange {
  start?: Date;
  end?: Date;
}

interface DatePickerProps {
  range?: DateRange;
  onChange: (range: DateRange) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ range, onChange }) => {
  const [start, setStart] = React.useState<Moment | null>(
    range?.start ? moment(range?.start) : null
  );
  const [end, setEnd] = React.useState<Moment | null>(
    range?.end ? moment(range?.end) : null
  );

  const [showDialog, setShowDialog] = React.useState(false);
  const [focus, setFocus] = React.useState<FocusedInputShape | null>(null);

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleOpen = React.useCallback(() => {
    setShowDialog(true);
  }, []);

  console.log({ start, end, focus });

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        className="h-10 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 text-sm"
      >
        {range ? (
          <React.Fragment>
            <span>Start</span>
            <span>End</span>
          </React.Fragment>
        ) : (
          <span className="text-gray-500">Select date range</span>
        )}
      </Button>
      <Dialog
        className="overflow-x-auto"
        aria-label="date-picker-modal"
        isOpen={showDialog}
        onDismiss={handleClose}
      >
        <div className="space-y-4">
          <DayPickerRangeController
            hideKeyboardShortcutsPanel
            keepOpenOnDateSelect
            startDate={start}
            endDate={end}
            onDatesChange={({ startDate, endDate }) => {
              setStart(startDate);
              setEnd(endDate);
            }}
            numberOfMonths={2}
            focusedInput={focus || "startDate"}
            onFocusChange={(newFocus) => {
              console.log(newFocus);
              setFocus(newFocus);
            }}
            initialVisibleMonth={() => moment().add(3, "M")}
          />
          <hr className="border-gray-200" />
          <Button startIcon={<FiCheck />}>Confirm Date Range</Button>
          <Button startIcon={<FiCheck />} variant="secondary">
            Confirm Date Range
          </Button>
          <Button startIcon={<FiCheck />} variant="white">
            Confirm Date Range
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
