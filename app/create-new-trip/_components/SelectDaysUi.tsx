// src/components/SelectDaysUi.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface SelectDaysUiProps {
  onSelectedOption: (value: string) => void;
}

const SelectDaysUi: React.FC<SelectDaysUiProps> = ({ onSelectedOption }) => {
  const [days, setDays] = useState(3);

  const handleConfirm = () => {
    onSelectedOption(`${days} Days`);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        How many days do you want to travel?
      </h3>
      <div className="flex items-center space-x-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDays((prev) => Math.max(1, prev - 1))}
          className="rounded-full h-10 w-10 text-gray-600"
        >
          -
        </Button>
        <span className="text-2xl font-bold text-gray-900">
          {days} Days
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDays((prev) => prev + 1)}
          className="rounded-full h-10 w-10 text-gray-600"
        >
          +
        </Button>
      </div>
      <Button onClick={handleConfirm} className="w-full mt-2">
        Confirm
      </Button>
    </div>
  );
};

export default SelectDaysUi;