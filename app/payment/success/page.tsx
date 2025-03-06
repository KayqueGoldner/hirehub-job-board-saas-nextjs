import { CheckIcon } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentSuccessPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <CheckIcon className="size-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>

          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-semibold">Payment Successfull</h2>
            <p className="mt-2 text-balance text-sm tracking-tight text-muted-foreground">
              Congrats, your payment was successfull. Your job posting is now
              active!
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

export default PaymentSuccessPage;
