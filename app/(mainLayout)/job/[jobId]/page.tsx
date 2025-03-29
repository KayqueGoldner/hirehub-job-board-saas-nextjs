import { HeartIcon } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { request } from "@arcjet/next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getFlagEmoji } from "@/app/utils/countries-list";
import { JsonToHtml } from "@/components/general/json-to-html";
import { benefits } from "@/app/utils/benefits-list";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";
import { auth } from "@/app/utils/auth";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  }),
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      }),
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      }),
    );
  }
}

async function getJob(jobId: string) {
  const jobData = await prisma.jobPost.findUnique({
    where: { status: "ACTIVE", id: jobId },
    select: {
      jobTitle: true,
      jobDescription: true,
      location: true,
      employmentType: true,
      benefits: true,
      listingDuration: true,
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
  });

  if (!jobData) {
    return notFound();
  }

  return jobData;
}

interface JobIdPageProps {
  params: Promise<{ jobId: string }>;
}

const JobIdPage = async ({ params }: JobIdPageProps) => {
  const { jobId } = await params;
  const session = await auth();
  const req = await request();

  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("forbidden");
  }

  const data = await getJob(jobId);
  const locationFlag = getFlagEmoji(data.location);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="col-span-2 space-y-8">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{data.jobTitle}</h1>
            <div className="mt-2 flex items-center gap-2">
              <p className="font-medium">{data.Company.name}</p>

              <span className="hidden text-muted-foreground md:inline">*</span>

              <Badge variant="secondary" className="rounded-full">
                {data.employmentType}
              </Badge>

              <span className="hidden text-muted-foreground md:inline">*</span>

              <Badge className="rounded-full">
                {locationFlag && <span className="mr-1">{locationFlag}</span>}
                {data.location}
              </Badge>
            </div>
          </div>

          <Button variant="outline">
            <HeartIcon className="size-4" />
            Save Job
          </Button>
        </div>

        <section>
          <JsonToHtml json={JSON.parse(data.jobDescription)} />
        </section>

        <section>
          <h3 className="mb-4 font-semibold">
            Benefits
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              (green is offered)
            </span>
          </h3>

          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = data.benefits.includes(benefit.id);

              return (
                <Badge
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm",
                    isOffered ? "" : "cursor-not-allowed opacity-75",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Apply now</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Please let {data.Company.name} know you found this job on
                HireHub. This helps us grow!
              </p>
            </div>

            <Button className="w-full">Apply now</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold">About the job</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Apply before
              </span>
              <span className="text-sm">
                {new Date(
                  data.createdAt.getTime() +
                    data.listingDuration * 24 * 60 * 60 * 1000,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Posted on</span>
              <span className="text-sm">
                {data.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Employment Type
              </span>
              <span className="text-sm">{data.employmentType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm">
                {locationFlag && <span className="mr-1">{locationFlag}</span>}
                {data.location}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={data.Company.logo}
                alt={data.Company.name}
                width={48}
                height={48}
                className="size-12 rounded-full"
              />

              <div className="flex flex-col">
                <h3 className="font-semibold">{data.Company.name}</h3>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {data.Company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobIdPage;
