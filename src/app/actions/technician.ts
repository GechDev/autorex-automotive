"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function addJobItem(data: {
  orderId: number;
  itemName: string;
  itemType: "LABOR" | "PART";
  technicianNotes?: string;
}) {
  await requireRole(["ADMIN", "TECHNICIAN"]);

  // Note: unitPrice and quantity are set by the Advisor later. Technician just defines the task.
  const item = await prisma.jobItem.create({
    data: {
      orderId: data.orderId,
      itemName: data.itemName,
      itemType: data.itemType,
      technicianNotes: data.technicianNotes,
      unitPrice: 0,
      quantity: 1,
    }
  });

  revalidatePath(`/technician/jobs/${data.orderId}`);
  return item;
}

export async function deleteJobItem(itemId: number, orderId: number) {
  await requireRole(["ADMIN", "TECHNICIAN"]);

  await prisma.jobItem.delete({
    where: { id: itemId }
  });

  revalidatePath(`/technician/jobs/${orderId}`);
}

export async function completeInspection(orderId: number) {
  await requireRole(["ADMIN", "TECHNICIAN"]);

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "PENDING_APPROVAL" } // Hand back to advisor
  });

  revalidatePath("/technician/jobs");
  revalidatePath(`/technician/jobs/${orderId}`);
}

export async function completeRepair(orderId: number) {
  await requireRole(["ADMIN", "TECHNICIAN"]);

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "READY_FOR_PAYMENT" } // Hand over to cashier
  });

  revalidatePath("/technician/jobs");
  revalidatePath(`/technician/jobs/${orderId}`);
}
