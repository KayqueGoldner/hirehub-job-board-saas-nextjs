import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/app/utils/format-currency";
import { formatRelativeTime } from "@/app/utils/format-relative-time";

interface JobCardProps {
  job: {
    id: string;
    createdAt: Date;
    Company: {
      about: string;
      name: string;
      location: string;
      logo: string;
    };
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
  };
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className="transition-all duration-300 hover:border-primary hover:shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row">
            <Image
              src={job.Company.logo}
              alt={job.Company.name}
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />
            <div>
              <h1 className="text-xl font-bold md:text-2xl">{job.jobTitle}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {job.Company.name}
                </p>
                <span className="hidden text-muted-foreground md:inline">
                  *
                </span>
                <Badge variant="secondary" className="rounded-full">
                  {job.employmentType}
                </Badge>
                <span className="hidden text-muted-foreground md:inline">
                  *
                </span>
                <Badge className="rounded-full">{job.location}</Badge>
                <span className="hidden text-muted-foreground md:inline">
                  *
                </span>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(job.salaryFrom)} -{" "}
                  {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>

            <div className="md:ml-auto">
              <div className="flex items-center justify-end gap-2">
                <MapPinIcon className="size-4" />
                <h1>{job.location}</h1>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>

          <p className="line-clamp-2 pt-5 text-base text-muted-foreground">
            {job.Company.about}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
};
