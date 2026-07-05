"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const customerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

export async function createCustomer(
  data: CustomerFormData
): Promise<{ success: boolean; error?: string }> {
  const parsed = customerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Validation failed" };
  }
  try {
    await prisma.customerIdentifier.create({ 
      data: {
        customer_email: parsed.data.email,
        customer_phone_number: parsed.data.phone,
        customer_hash: Math.random().toString(36).substring(2, 15), // Basic placeholder for hash
        info: {
          create: {
            customer_first_name: parsed.data.firstName,
            customer_last_name: parsed.data.lastName,
            active_customer_status: 1
          }
        }
      } 
    });
    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error) {
    console.error("Failed to create customer:", error);
    return { success: false, error: "Failed to create customer. Email may already exist." };
  }
}

export async function updateCustomer(
  id: string,
  data: Partial<CustomerFormData>
): Promise<{ success: boolean; error?: string }> {
  try {
    const numId = parseInt(id);
    await prisma.customerIdentifier.update({ 
      where: { customer_id: numId }, 
      data: {
        ...(data.email && { customer_email: data.email }),
        ...(data.phone && { customer_phone_number: data.phone }),
        ...( (data.firstName || data.lastName) && {
          info: {
            update: {
              ...(data.firstName && { customer_first_name: data.firstName }),
              ...(data.lastName && { customer_last_name: data.lastName }),
            }
          }
        })
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
  try {
    const numId = parseInt(id);
    await prisma.customerInfo.deleteMany({ where: { customer_id: numId } });
    await prisma.customerIdentifier.delete({ where: { customer_id: numId } });
    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return { success: false, error: "Failed to delete customer" };
  }
}
