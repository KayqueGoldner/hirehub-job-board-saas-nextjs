"use client";

import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryList } from "@/app/utils/countries-list";
import { useCallback } from "react";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export const JobFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // get current filters from url
  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";

  const clearAllFilters = () => {
    router.push("/");
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams],
  );

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    const current = new Set(currentJobTypes);

    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }

    const newValue = Array.from(current).join(",");

    router.push(`?${createQueryString("jobTypes", newValue)}`);
  };

  const handleLocationChange = (location: string) => {
    router.push(`?${createQueryString("location", location)}`);
  };

  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button
          variant="destructive"
          size="sm"
          className="h-8"
          onClick={clearAllFilters}
        >
          <span>Clear all</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Job Type</Label>
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((jobType, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={jobType}
                  checked={currentJobTypes.includes(jobType)}
                  onCheckedChange={(checked) =>
                    handleJobTypeChange(jobType, !!checked)
                  }
                />
                <Label htmlFor={jobType} className="text-sm font-medium">
                  {jobType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Location</Label>
          <Select value={currentLocation} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>
                  <span className="ml-2">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className="ml-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
