"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

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
    let sId = undefined;
    if (parsed.data.serviceId) {
      const parsedServiceId = parseInt(parsed.data.serviceId);
      if (!isNaN(parsedServiceId)) {
        sId = parsedServiceId;
      }
    }

    await prisma.appointment.create({
      data: {
        customerName: parsed.data.customerName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        vehicleInfo: parsed.data.vehicleInfo || "",
        preferredDate: parsed.data.preferredDate,
        preferredTime: parsed.data.preferredTime,
        message: parsed.data.message || "",
        ...(sId && { serviceId: sId })
      }
    });

    return { success: true, message: "Appointment requested successfully." };
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return { success: false, error: "Failed to create appointment." };
  }
}
