import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/empty-state";
import { JobCard } from "@/components/general/job-card";
import { MainPagination } from "@/components/general/main-pagination";

async function getData(page: number = 1, pageSize: number = 10) {
  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
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
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.jobPost.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export const JobListings = async ({ currentPage }: { currentPage: number }) => {
  const { jobs, totalPages } = await getData(currentPage, 5);

  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
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

      <div className="mt-6 flex justify-center">
        <MainPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
};
