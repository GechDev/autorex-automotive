"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveEstimate(orderHash: string) {
  // Find order by hash to verify it's the right customer
  const order = await prisma.order.findUnique({
    where: { orderHash }
  });

  if (!order || order.status !== "PENDING_APPROVAL") {
    throw new Error("Invalid order or order is not pending approval.");
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "IN_REPAIR" }
  });

  revalidatePath(`/track/${orderHash}`);
}
