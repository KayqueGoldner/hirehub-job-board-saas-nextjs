"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { requireUser } from "@/app/utils/requiserUser";
import { companySchema } from "@/app/utils/zodSchemas";
import { prisma } from "@/app/utils/db";

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: { id: session.id },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}
