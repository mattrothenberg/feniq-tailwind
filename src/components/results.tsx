import React from "react";
import { RiTableLine } from "react-icons/ri";

import { Button } from "./button";
import { Toggle } from "./toggle";

const BuildingResult = () => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div>
        <header className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold tracking-tight text-gray-700">
              304 Canal Street
            </h3>
            <p className="text-sm text-gray-600">Manhattan, 10013</p>
          </div>
          <Button variant="secondary" size="xs">
            View Details
          </Button>
        </header>
        <div className="p-4 grid grid-cols-3 border-b border-gray-100">
          <div>
            <p className="text-xs font-medium text-gray-500">BBN</p>
            <p className="text-sm">1022400029</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">BIN</p>
            <p className="text-sm">1234567</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Status</p>
            <p className="text-sm text-green-600">Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Results = () => {
  const [showMap, setShowMap] = React.useState(false);

  const handleMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowMap(e.target.checked);
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <header className="h-16 flex bg-white border-b px-4 justify-between flex-shrink-0">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <p className="text-gray-600">
              Showing <span className="font-medium">1—20</span> of{" "}
              <span className="font-medium">76</span>
            </p>
          </div>
          <div className="flex items-center">
            <Toggle checked={showMap} onChange={handleMapChange}>
              View on Map
            </Toggle>
          </div>
        </div>
        <div className="flex items-center">
          <Button startIcon={<RiTableLine />} size="xs" variant="white">
            Export Results
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          <BuildingResult />
        </div>
      </div>
    </div>
  );
};
