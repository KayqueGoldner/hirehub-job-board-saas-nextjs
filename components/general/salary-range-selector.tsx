/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Control, useController } from "react-hook-form";

import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/app/utils/format-currency";

interface SalaryRangeSelectorProps {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
  currency: string;
}

export const SalaryRangeSelector = ({
  control,
  minSalary,
  maxSalary,
  step,
  currency,
}: SalaryRangeSelectorProps) => {
  const { field: fromField } = useController({
    name: "salaryFrom",
    control,
  });
  const { field: toField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  function handleChangeRange(value: number[]) {
    const newRange = [value[0], value[1]] as [number, number];
    setRange(newRange);
    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  }

  return (
    <div className="w-full space-y-4">
      <Slider
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
        onValueChange={handleChangeRange}
      />
      <div className="flex justify-between">
        <span>{formatCurrency(range[0])}</span>
        <span>{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
};
