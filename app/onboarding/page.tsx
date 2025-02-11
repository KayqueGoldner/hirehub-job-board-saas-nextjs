import { redirect } from "next/navigation";

import { prisma } from "@/app/utils/db";
import { OnboardingForm } from "@/components/forms/onboarding/onboarding-form";
import { requireUser } from "@/app/utils/requiserUser";

async function checkUserOnboardingStatus(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    return redirect("/");
  }

  return user;
}

const OnboardingPage = async () => {
  const session = await requireUser();
  await checkUserOnboardingStatus(session.id as string);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
