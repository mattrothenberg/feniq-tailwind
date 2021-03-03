import React from "react";
import { RiTableLine } from "react-icons/ri";

import { Button } from "./button";
import { Toggle } from "./toggle";

export const Results = () => {
  const [showMap, setShowMap] = React.useState(false);

  const handleMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowMap(e.target.checked);
  };

  return (
    <div className="h-16 flex bg-white border-b px-4 justify-between">
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
    </div>
  );
};
