import { ControllerRenderProps } from "react-hook-form";

import { benefits } from "@/app/utils/benefits-list";
import { Badge } from "@/components/ui/badge";

interface BenefitsSelectorProps {
  field: ControllerRenderProps;
}

export const BenefitsSelector = ({ field }: BenefitsSelectorProps) => {
  const toggleBenefit = (benefitId: string) => {
    const newBenefits = field.value || [];
    const index = newBenefits.indexOf(benefitId);

    if (index === -1) {
      newBenefits.push(benefitId);
    } else {
      newBenefits.splice(index, 1);
    }

    field.onChange(newBenefits);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit) => {
          const isSelected = field.value?.includes(benefit.id);

          return (
            <Badge
              key={benefit.id}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer rounded-full px-4 py-1.5 text-sm transition-all hover:scale-105 active:scale-95"
              onClick={() => toggleBenefit(benefit.id)}
            >
              <span className="flex items-center gap-2">
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}
        {/* benefits selected count */}
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="text-primary">{field.value?.length}</span>{" "}
          {field.value?.length === 1 ? "benefit" : "benefits"} selected
        </div>
      </div>
    </div>
  );
};
