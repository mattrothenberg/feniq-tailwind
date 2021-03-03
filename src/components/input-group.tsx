import React from "react";
import { RiInformationFill } from "react-icons/ri";
import { Button } from "reakit/Button";

interface InputGroupProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  id: string;
}
export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  description,
  children,
  id,
}) => {
  const [showDescription, setShowDescription] = React.useState(false);

  const handleToggleDescription = () => {
    setShowDescription((curr) => !curr);
  };

  return (
    <div>
      <div className="flex items-center space-x-1">
        <label htmlFor={id} className="block text-xs font-medium text-gray-500">
          {label}
        </label>
        {description && (
          <Button
            onClick={handleToggleDescription}
            className="w-4 h-4 text-gray-400 appearance-none focus:outline-none"
          >
            <RiInformationFill size={14} />
          </Button>
        )}
      </div>
      <div className="mt-2">{children}</div>
      {description && showDescription && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};
