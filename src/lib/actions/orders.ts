"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

const orderSchema = z.object({
  customerId: z.number(),
  vehicleId: z.number(),
  employeeId: z.number(),
  totalPrice: z.number().min(0),
  additionalRequest: z.string().optional(),
  notesCustomer: z.string().optional(),
  notesInternal: z.string().optional(),
  serviceIds: z.array(z.number()).min(1, "At least one service is required"),
});

export type OrderFormData = z.infer<typeof orderSchema>;

export async function createOrder(
  data: OrderFormData
): Promise<{ success: boolean; error?: string }> {
  const parsed = orderSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }
  
  try {
    const orderHash = crypto.randomBytes(16).toString("hex");
    
    await prisma.order.create({ 
      data: {
        employee_id: parsed.data.employeeId,
        customer_id: parsed.data.customerId,
        vehicle_id: parsed.data.vehicleId,
        active_order: 1,
        order_hash: orderHash,
        info: {
          create: {
            order_total_price: parsed.data.totalPrice,
            additional_request: parsed.data.additionalRequest || "",
            notes_for_customer: parsed.data.notesCustomer || "",
            notes_for_internal_use: parsed.data.notesInternal || "",
            additional_requests_completed: 0,
          }
        },
        services: {
          create: parsed.data.serviceIds.map(id => ({
            service_id: id,
            service_completed: 0
          }))
        }
      } 
    });
    
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order." };
  }
}
