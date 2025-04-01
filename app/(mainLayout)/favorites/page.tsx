import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requiserUser";
import { EmptyState } from "@/components/general/empty-state";
import { JobCard } from "@/components/general/job-card";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: { userId },
    select: {
      JobPost: {
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
      },
    },
  });

  return data;
}

const FavoritesPage = async () => {
  const session = await requireUser();
  const data = await getFavorites(session.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        description="You don't have any favorites yet."
        buttonText="Find a job"
        href="/"
      />
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 gap-4">
      {data.map((favorite) => (
        <JobCard key={favorite.JobPost.id} job={favorite.JobPost} />
      ))}
    </div>
  );
};

export default FavoritesPage;
