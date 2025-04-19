import { XIcon } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/app/utils/requiserUser";

const PaymentCancelPage = async () => {
  await requireUser();

  return (
    <div className="flex min-h-screen w-full flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <XIcon className="size-12 rounded-full bg-red-500/30 p-2 text-red-500" />
          </div>

          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="mt-2 text-balance text-sm tracking-tight text-muted-foreground">
              Oops, your payment was cancelled. You can try paying again later.
            </p>

            <Button className="mt-5 w-full" asChild>
              <Link href="/">Go back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
