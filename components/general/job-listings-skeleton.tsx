import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const JobListingsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="size-14 rounded" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-5 w-[200px]" />

              <div className="mt-4 flex gap-4">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
