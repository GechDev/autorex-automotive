"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { requireRole } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

/**
 * Fetch all active job cards that the advisor needs to track.
 */
export async function getActiveJobs() {
  await requireRole(["ADMIN", "ADVISOR"]);

  const jobs = await prisma.order.findMany({
    where: {
      status: {
        notIn: ["COMPLETED"] // Exclude fully completed jobs for the active view
      }
    },
    include: {
      customer: true,
      vehicle: true,
      advisor: true,
      technician: true,
      items: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return jobs;
}

/**
 * Create a new Job Card (Check-in / Intake)
 */
export async function createJobCard(data: {
  customerId: number,
  vehicleId: number,
  checkInMileage: number,
  fuelLevel: string,
  complaints: string,
  damagePhotos?: string[],
  technicianId: number
}) {
  const session = await requireRole(["ADMIN", "ADVISOR"]);

  const order = await prisma.order.create({
    data: {
      customerId: data.customerId,
      vehicleId: data.vehicleId,
      advisorId: parseInt(session.id.toString()),
      technicianId: data.technicianId,
      status: "INSPECTION", // Auto-dispatch since technician is always assigned
      checkInMileage: data.checkInMileage,
      fuelLevel: data.fuelLevel,
      complaints: data.complaints,
      damagePhotos: data.damagePhotos || [],
    }
  });

  revalidatePath("/advisor/jobs");
  revalidatePath("/technician/jobs");
  return order;
}

/**
 * Transition a job from CHECKED_IN to INSPECTION (dispatch to tech)
 */
export async function dispatchToTechnician(orderId: number) {
  await requireRole(["ADMIN", "ADVISOR"]);

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "INSPECTION" }
  });

  revalidatePath("/advisor/jobs");
  return order;
}

/**
 * Update prices and quantities for estimate items and optionally dispatch
 */
export async function updateEstimate(
  orderId: number, 
  items: { id: number; unitPrice: number; quantity: number }[],
  dispatchToCustomer: boolean
) {
  await requireRole(["ADMIN", "ADVISOR"]);

  // Update all items in a transaction
  await prisma.$transaction(
    items.map((item) => 
      prisma.jobItem.update({
        where: { id: item.id },
        data: {
          unitPrice: item.unitPrice,
          quantity: item.quantity,
        }
      })
    )
  );

  // If dispatching, status stays PENDING_APPROVAL but in a real app would trigger SMS/Email
  // For now, we will just simulate it.
  // Actually, we could just say the estimate is sent. Wait, we just keep it PENDING_APPROVAL.
  // When customer approves (simulated in magic link), it goes to IN_REPAIR.

  revalidatePath(`/advisor/estimates/${orderId}`);
  revalidatePath(`/advisor/jobs/${orderId}`);
  
  return { success: true };
}

/**
 * Complete the delivery handover
 */
export async function completeHandoverAction(orderId: number) {
  await requireRole(["ADMIN", "ADVISOR"]);

  await prisma.order.update({ 
    where: { id: orderId }, 
    data: { status: "COMPLETED", completedAt: new Date() } 
  });
  
  revalidatePath("/advisor/deliveries");
  return { success: true };
}
