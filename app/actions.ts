"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { request } from "@arcjet/next";

import { requireUser } from "@/app/utils/requiserUser";
import {
  companySchema,
  jobSchema,
  jobSeekerSchema,
} from "@/app/utils/zodSchemas";
import { prisma } from "@/app/utils/db";
import arcjet, { detectBot, shield } from "@/app/utils/arcjet";
import { stripe } from "@/app/utils/stripe";
import { jobListingDurationPricing } from "@/app/utils/job-listing-duration-pricing";

const aj = arcjet
  .withRule(shield({ mode: "LIVE" }))
  .withRule(detectBot({ mode: "LIVE", allow: [] }));

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

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

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: { id: user.id as string },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name!,
    });

    stripeCustomerId = customer.id;

    // update user with stipe customer id
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId,
      },
    });
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      companyId: company.id,
      employmentType: validateData.employmentType,
      location: validateData.location,
      jobDescription: validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      listingDuration: validateData.listingDuration,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      benefits: validateData.benefits,
    },
    select: {
      id: true,
    },
  });

  const pricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validateData.listingDuration,
  );

  if (!pricingTier) {
    throw new Error("Invalid listing duration selected");
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job posting - ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              "https://61s4tbof9m.ufs.sh/f/f66ThYMlxUP5CCWwBi7z1DwFyje24HorxmsYk8vtpASLO0uf",
            ],
          },
          currency: "USD",
          unit_amount: pricingTier.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      jobId: jobPost.id,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
}
