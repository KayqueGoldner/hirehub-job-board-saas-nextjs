"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { toast } from "sonner";

export const CopyLink = ({ jobUrl }: { jobUrl: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("URL copied");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2Icon className="size-4" />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
};
