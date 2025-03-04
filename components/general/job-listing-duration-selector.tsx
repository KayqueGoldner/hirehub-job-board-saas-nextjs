import { ControllerRenderProps } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { jobListingDurationPricing } from "@/app/utils/job-listing-duration-pricing";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JobListingDurationSelectorProps {
  field: ControllerRenderProps;
}

export const JobListingDurationSelector = ({
  field,
}: JobListingDurationSelectorProps) => {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
    >
      <div className="flex flex-col gap-4">
        {jobListingDurationPricing.map((duration) => {
          return (
            <div key={duration.days} className="relative">
              <RadioGroupItem
                value={duration.days.toString()}
                id={duration.days.toString()}
                className="sr-only"
              />
              <Label
                className="flex cursor-pointer flex-col"
                htmlFor={duration.days.toString()}
              >
                <Card
                  className={cn(
                    "border-2 p-4 transition-all",
                    field.value === duration.days
                      ? "border-primary bg-primary/10"
                      : "hover:bg-secondary/50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{duration.days}</p>
                      <p className="text-sm text-muted-foreground">
                        {duration.description}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold">${duration.price}</p>
                      <p className="text-sm text-muted-foreground">
                        ${(duration.price / duration.days).toFixed(2)}/day
                      </p>
                    </div>
                  </div>
                </Card>
              </Label>
            </div>
          );
        })}
      </div>
    </RadioGroup>
  );
};
