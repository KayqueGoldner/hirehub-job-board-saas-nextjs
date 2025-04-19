import { Suspense } from "react";

import { JobFilters } from "@/components/general/job-filters";
import { JobListings } from "@/components/general/job-listings";
import { JobListingsSkeleton } from "@/components/general/job-listings-skeleton";

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const currentPage = parseInt(params.page || "1");
  const jobTypesParams = params.jobTypes?.split(",") || [];
  const locationParams = params.location || "";

  const filterKey = `${currentPage}-${jobTypesParams.join(",")}-${locationParams}`;

  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilters />

      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingsSkeleton />} key={filterKey}>
          <JobListings
            currentPage={currentPage}
            jobTypes={jobTypesParams}
            location={locationParams}
          />
        </Suspense>
      </div>
    </div>
  );
}
