import Image from "next/image";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArcjetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import { CreateJobForm } from "@/components/forms/create-job-form";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requiserUser";

const companies = [
  { id: 0, name: "Arcjet", logo: ArcjetLogo },
  { id: 1, name: "Inngest", logo: InngestLogo },
  { id: 2, name: "Arcjet", logo: ArcjetLogo },
  { id: 3, name: "Inngest", logo: InngestLogo },
  { id: 4, name: "Arcjet", logo: ArcjetLogo },
  { id: 5, name: "Inngest", logo: InngestLogo },
];

const testimonials = [
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "John Doe",
    company: "ABC Company",
  },
  {
    quote:
      "The candidate demonstrated exceptional problem-solving skills and a strong work ethic.",
    author: "Jane Smith",
    company: "XYZ Corporation",
  },
  {
    quote:
      "The candidate's communication skills were excellent, and they were able to work efficiently with our team.",
    author: "Michael Johnson",
    company: "123 Enterprises",
  },
  {
    quote:
      "The candidate's attention to detail and ability to work under pressure were impressive.",
    author: "Emily Davis",
    company: "456 Enterprises",
  },
];

const stats = [
  {
    id: 0,
    value: "10k+",
    label: "Monthly active job seekers",
  },
  {
    id: 1,
    value: "48h",
    label: "Average time to hire",
  },
  {
    id: 2,
    value: "95%",
    label: "Employer satisfication rate",
  },
  {
    id: 3,
    value: "500+",
    label: "Companies hiring remotely",
  },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: { userId },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }

  return data;
}

const PostJobPage = async () => {
  const session = await requireUser();
  const data = await getCompany(session.id as string);

  return (
    <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />

      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* company logos */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id} className="flex items-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.quote}>
                  <blockquote className="border-l-2 border-primary pl-4">
                    <p className="text-sm font-medium italic text-muted-foreground">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <footer className="mt-2 text-xs font-medium text-neutral-400">
                      - {testimonial.author}, {testimonial.company}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>

            {/* render stats here */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center rounded-lg bg-muted p-4 text-center"
                >
                  <h4 className="text-2xl font-bold text-primary">
                    {stat.value}
                  </h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
