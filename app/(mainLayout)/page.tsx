import { Suspense } from "react";

import { JobFilters } from "@/components/general/job-filters";
import { JobListings } from "@/components/general/job-listings";
import { JobListingsSkeleton } from "@/components/general/job-listings-skeleton";

interface HomeProps {
  searchParams: Promise<{
    page: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;

  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilters />

      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingsSkeleton />} key={page}>
          <JobListings currentPage={parseInt(page || "1")} />
        </Suspense>
      </div>
    </div>
  );
}
