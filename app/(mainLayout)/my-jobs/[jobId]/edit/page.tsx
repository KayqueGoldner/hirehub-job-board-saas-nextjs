import { notFound } from "next/navigation";

import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requiserUser";
import { EditJobForm } from "@/components/forms/edit-job-form";

async function getData(jobId: string, userId: string) {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      Company: { userId },
    },
    select: {
      id: true,
      benefits: true,
      jobTitle: true,
      jobDescription: true,
      salaryFrom: true,
      salaryTo: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      Company: {
        select: {
          about: true,
          name: true,
          location: true,
          website: true,
          xAccount: true,
          logo: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

interface EditJobPageProps {
  params: Promise<{ jobId: string }>;
}

const EditJobPage = async ({ params }: EditJobPageProps) => {
  const { jobId } = await params;
  const user = await requireUser();
  const data = await getData(jobId, user.id as string);

  return <EditJobForm jobPost={data} />;
};

export default EditJobPage;
