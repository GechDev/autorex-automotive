"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

const appointmentSchema = z.object({
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  vehicleInfo: z.string().optional(),
  serviceId: z.string().optional(),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  message: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentFormData): Promise<{ success: boolean; message?: string; error?: string }> {
  const parsed = appointmentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }
  
  try {
    // Note: serviceId is removed from the model so we don't save it anymore
    await prisma.appointment.create({
      data: {
        customerName: parsed.data.customerName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        vehicleInfo: parsed.data.vehicleInfo || "",
        preferredDate: parsed.data.preferredDate,
        preferredTime: parsed.data.preferredTime,
        message: parsed.data.message || "",
      }
    });

    return { success: true, message: "Appointment requested successfully." };
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return { success: false, error: "Failed to create appointment." };
  }
}

export async function getAppointments() {
  await requireRole(["ADMIN", "ADVISOR"]);
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return appointments;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return [];
  }
}

export async function updateAppointmentStatus(id: number, status: string): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN", "ADVISOR"]);
  
  const validStatuses = ["PENDING", "APPROVED", "COMPLETED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    return { success: false, error: "Invalid status" };
  }

  try {
    await prisma.appointment.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/appointments");
    return { success: true };
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return { success: false, error: "Failed to update appointment" };
  }
}

export async function deleteAppointment(id: number): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN"]);
  try {
    await prisma.appointment.delete({
      where: { id }
    });
    revalidatePath("/admin/appointments");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    return { success: false, error: "Failed to delete appointment" };
  }
}
