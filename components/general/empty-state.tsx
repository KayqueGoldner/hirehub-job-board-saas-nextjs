import Link from "next/link";
import { BanIcon, PlusCircleIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const EmptyState = ({
  buttonText,
  description,
  href,
  title,
}: EmptyStateProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center rounded-md border border-dashed p-8">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <BanIcon className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 max-w-sm text-balance text-sm leading-tight text-muted-foreground">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircleIcon />
        {buttonText}
      </Link>
    </div>
  );
};
