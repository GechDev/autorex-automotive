"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth-utils";

const customerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

export async function createCustomer(
  data: CustomerFormData
): Promise<{ success: boolean; error?: string; customerId?: number; customerName?: string }> {
  await requireRole(["ADMIN", "ADVISOR", "CASHIER"]);
  const parsed = customerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Validation failed" };
  }
  try {
    const customer = await prisma.customer.create({ 
      data: {
        email: parsed.data.email,
        phoneNumber: parsed.data.phone,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
      } 
    });
    revalidatePath("/admin/customers");
    revalidatePath("/advisor/check-in");
    return { 
      success: true, 
      customerId: customer.id,
      customerName: `${customer.firstName} ${customer.lastName}`,
    };
  } catch (error) {
    console.error("Failed to create customer:", error);
    return { success: false, error: "Failed to create customer. Email may already exist." };
  }
}

export async function updateCustomer(
  id: string,
  data: Partial<CustomerFormData>
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN", "ADVISOR", "CASHIER"]);
  try {
    const numId = parseInt(id);
    await prisma.customer.update({ 
      where: { id: numId }, 
      data: {
        ...(data.email && { email: data.email }),
        ...(data.phone && { phoneNumber: data.phone }),
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
      } 
    });
    revalidatePath("/admin/customers");
    revalidatePath(`/admin/customers/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update customer:", error);
    return { success: false, error: "Failed to update customer" };
  }
}

export async function deleteCustomer(
  id: string
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN", "ADVISOR"]);
  try {
    const numId = parseInt(id);
    await prisma.customer.delete({ where: { id: numId } });
    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return { success: false, error: "Failed to delete customer" };
  }
}
