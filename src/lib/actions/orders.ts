"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

import { requireRole } from "@/lib/auth-utils";

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
  await requireRole(["ADMIN"]);
  
  const parsed = orderSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }
  
  try {
    const orderHash = crypto.randomBytes(16).toString("hex");
    
    // In the new schema, we map the admin's flat "order" to an Order with JobItems
    await prisma.order.create({ 
      data: {
        customerId: parsed.data.customerId,
        vehicleId: parsed.data.vehicleId,
        advisorId: parsed.data.employeeId,
        orderHash: orderHash,
        status: "READY_FOR_PAYMENT", // Admin manual orders are often direct-to-billing
        complaints: parsed.data.additionalRequest,
        items: {
          create: parsed.data.serviceIds.map((id, index) => ({
            itemName: `Standard Service #${id}`,
            itemType: "LABOR",
            quantity: 1,
            unitPrice: index === 0 ? parsed.data.totalPrice : 0, // Attach full price to the first item for simplicity
            technicianNotes: parsed.data.notesInternal || "",
            isApproved: true,
            isCompleted: true
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
