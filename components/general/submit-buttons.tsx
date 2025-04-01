"use client";

import { useFormStatus } from "react-dom";
import { HeartIcon, Loader2Icon } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends ButtonProps {
  text: string;
  icon?: React.ReactNode;
}

export const SubmitButton = ({
  text,
  icon,
  disabled,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || disabled} {...props}>
      {pending ? (
        <>
          <Loader2Icon className="size-4 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};

export const SaveJobButton = ({ savedJob }: { savedJob: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2Icon className="size-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <HeartIcon
            className={cn(
              "size-4 transition-colors",
              savedJob ? "fill-current text-red-500" : "",
            )}
          />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
};
