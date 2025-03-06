import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/app/utils/stripe";
import { prisma } from "@/app/utils/db";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature");

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const customerId = session.customer;
    const jobId = session.metadata?.jobId;

    if (!jobId) {
      return new Response("No job id found", { status: 400 });
    }

    const company = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId as string,
      },
      select: {
        Company: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!company) {
      return new Response("No company found", { status: 400 });
    }

    await prisma.jobPost.update({
      where: {
        id: jobId,
        companyId: company?.Company?.id as string,
      },
      data: {
        status: "ACTIVE",
      },
    });
  }

  return new Response(null, { status: 200 });
}
