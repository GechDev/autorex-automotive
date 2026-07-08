"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function processPayment(data: {
  orderId: number;
  paymentMethod: "CASH" | "CARD_POS" | "MOBILE_TRANSFER";
  amount: number;
  referenceNumber?: string;
}) {
  const session = await requireRole(["ADMIN", "CASHIER"]);

  // Verify order exists and is ready
  const order = await prisma.order.findUnique({
    where: { id: data.orderId },
    include: { items: true }
  });

  if (!order) throw new Error("Order not found");
  if (order.status !== "READY_FOR_PAYMENT") {
    throw new Error("Order is not ready for payment");
  }

  // Create payment record
  await prisma.payment.create({
    data: {
      orderId: data.orderId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      referenceNumber: data.referenceNumber,
      cashierId: parseInt(session.id.toString())
    }
  });

  // Update order status to PAID
  await prisma.order.update({
    where: { id: data.orderId },
    data: { status: "PAID" }
  });

  revalidatePath("/cashier/queue");
  revalidatePath(`/cashier/settle/${data.orderId}`);
  
  return { success: true };
}

export async function completeHandover(orderId: number) {
  await requireRole(["ADMIN", "CASHIER"]);

  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });

  if (!order || order.status !== "PAID") {
    throw new Error("Order must be PAID before handover.");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { 
      status: "COMPLETED",
      completedAt: new Date()
    }
  });

  revalidatePath("/cashier/queue");
  revalidatePath("/cashier/history");
}
