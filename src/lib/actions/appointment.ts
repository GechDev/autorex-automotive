"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const appointmentSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  vehicleInfo: z.string().optional(),
  serviceId: z.string().optional(),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export type AppointmentActionResult =
  | { success: true; message: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createAppointment(
  data: AppointmentFormData
): Promise<AppointmentActionResult> {
  const parsed = appointmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.appointment.create({
      data: {
        customerName: parsed.data.customerName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        vehicleInfo: parsed.data.vehicleInfo || undefined,
        serviceId: parsed.data.serviceId || undefined,
        preferredDate: parsed.data.preferredDate,
        preferredTime: parsed.data.preferredTime,
        message: parsed.data.message || undefined,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/appointments");

    return {
      success: true,
      message:
        "Your appointment request has been submitted. We will contact you to confirm.",
    };
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return {
      success: false,
      error: "Failed to submit appointment. Please try again.",
    };
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/appointments");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update appointment status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteAppointment(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.appointment.delete({ where: { id } });
    revalidatePath("/admin/appointments");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    return { success: false, error: "Failed to delete appointment" };
  }
}
