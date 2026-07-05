"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const vehicleSchema = z.object({
  customerId: z.number(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  make: z.string().min(1),
  model: z.string().min(1),
  type: z.string().min(1),
  mileage: z.number().min(0),
  tag: z.string().min(1),
  serial: z.string().min(1),
  color: z.string().min(1),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

export async function createVehicle(
  data: VehicleFormData
): Promise<{ success: boolean; error?: string }> {
  const parsed = vehicleSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }
  
  try {
    await prisma.customerVehicleInfo.create({ 
      data: {
        customer_id: parsed.data.customerId,
        vehicle_year: parsed.data.year,
        vehicle_make: parsed.data.make,
        vehicle_model: parsed.data.model,
        vehicle_type: parsed.data.type,
        vehicle_mileage: parsed.data.mileage,
        vehicle_tag: parsed.data.tag,
        vehicle_serial: parsed.data.serial,
        vehicle_color: parsed.data.color,
      } 
    });
    
    revalidatePath(`/admin/customers/${data.customerId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    return { success: false, error: "Failed to create vehicle." };
  }
}
