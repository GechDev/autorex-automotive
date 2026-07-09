"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const vehicleSchema = z.object({
  customerId: z.number(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  make: z.string().min(1),
  model: z.string().min(1),
  type: z.string().optional(),
  mileage: z.number().min(0),
  tag: z.string().min(1),
  serial: z.string().optional(),
  color: z.string().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

export async function createVehicle(
  data: VehicleFormData
): Promise<{ success: boolean; error?: string; vehicleId?: number; vehicleLabel?: string }> {
  const parsed = vehicleSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }
  
  try {
    const vehicle = await prisma.vehicle.create({ 
      data: {
        customerId: parsed.data.customerId,
        year: parsed.data.year,
        make: parsed.data.make,
        model: parsed.data.model,
        mileage: parsed.data.mileage,
        licensePlate: parsed.data.tag,
        vin: parsed.data.serial || null,
        color: parsed.data.color || null,
      } 
    });
    
    revalidatePath(`/admin/customers/${data.customerId}`);
    revalidatePath("/advisor/check-in");
    return { 
      success: true,
      vehicleId: vehicle.id,
      vehicleLabel: `${vehicle.licensePlate} - ${vehicle.make} ${vehicle.model}`,
    };
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    return { success: false, error: "Failed to create vehicle." };
  }
}
