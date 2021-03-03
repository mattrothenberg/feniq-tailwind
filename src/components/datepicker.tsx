import React from "react";
import { Dialog } from "@reach/dialog";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "react-dates/initialize";
import moment, { Moment } from "moment";
import "@reach/dialog/styles.css";
import "react-dates/lib/css/_datepicker.css";
import { RiCheckFill, RiCloseCircleFill } from "react-icons/ri";

import { Button } from "./button";

export interface DateRange {
  start?: Date;
  end?: Date;
}

interface DatePickerProps {
  range: DateRange;
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

  const handleConfirm = () => {
    onChange({ start: start?.toDate(), end: end?.toDate() });
    setShowDialog(false);
    setFocus(null);
  };

  const handleClear = () => {
    onChange({ start: undefined, end: undefined });
    setStart(null);
    setEnd(null);
    setFocus(null);
  };

  const hasRange = range?.start && range?.end;

  console.log("initialized start as", start);
  console.log("initialized end as", end);

  return (
    <React.Fragment>
      <div className="relative">
        <Button
          onClick={handleOpen}
          className="h-10 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 text-sm"
        >
          {hasRange ? (
            <React.Fragment>
              <span>{range?.start?.toLocaleDateString()}</span>
              <span> — </span>
              <span>{range?.end?.toLocaleDateString()}</span>
            </React.Fragment>
          ) : (
            <span className="text-gray-500">Select date range</span>
          )}
        </Button>
        {hasRange && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 z-0">
            <button onClick={handleClear}>
              <RiCloseCircleFill className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        )}
      </div>
      <Dialog
        className="overflow-x-auto"
        aria-label="date-picker-modal"
        isOpen={showDialog}
        onDismiss={handleClose}
      >
        <div className="p-6">
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
              setFocus(newFocus);
            }}
            initialVisibleMonth={() => moment().add(3, "M")}
          />
        </div>
        <div className="p-6 bg-gray-100 border-t border-gray-200">
          <div className="text-right">
            <Button onClick={handleConfirm} startIcon={<RiCheckFill />}>
              Confirm Date Range
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
