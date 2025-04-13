import Link from "next/link";
import { ArrowLeftIcon, TrashIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/general/submit-buttons";
import { requireUser } from "@/app/utils/requiserUser";
import { deleteJobPost } from "@/app/actions";

interface DeleteJobPageProps {
  params: Promise<{ jobId: string }>;
}

const DeleteJobPage = async ({ params }: DeleteJobPageProps) => {
  const { jobId } = await params;

  await requireUser();

  return (
    <div>
      <Card className="mx-auto mt-28 max-w-lg">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete your job
            listing and remove all of your data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between gap-2">
          <Link
            href="/my-jobs"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            <ArrowLeftIcon />
            Cancel
          </Link>

          <form
            action={async () => {
              "use server";

              await deleteJobPost(jobId);
            }}
          >
            <SubmitButton
              text="Delete Job"
              variant="destructive"
              icon={<TrashIcon />}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteJobPage;
