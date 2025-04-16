import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingJobIdPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="col-span-2 space-y-8">
          <div className="flex items-start justify-between">
            <div>
              <Skeleton className="mb-2 h-9 w-[300px]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-5 w-[120px]" />
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/5" />
          </section>

          <section>
            <Skeleton className="mb-4 h-6 w-[200px]" />
            <div className="flex flex-wrap gap-3">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-[140px] rounded-full" />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="mb-2 h-6 w-[100px]" />
                <Skeleton className="h-4 w-full" />
              </div>

              <Skeleton className="h-10 w-full" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-[150px]" />
              <div className="space-y-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                  >
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-5 w-[150px]" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoadingJobIdPage;
