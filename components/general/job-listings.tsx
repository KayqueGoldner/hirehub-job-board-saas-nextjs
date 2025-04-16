import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/empty-state";
import { JobCard } from "@/components/general/job-card";

async function getData() {
  const data = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      jobTitle: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      location: true,
      createdAt: true,
      Company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export const JobListings = async () => {
  const data = await getData();

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description="There are no active jobs at the moment. Check back later."
          buttonText="Clear all filters"
          href="/"
        />
      )}
    </>
  );
};
