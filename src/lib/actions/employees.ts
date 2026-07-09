"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth-utils";

const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "ADVISOR", "TECHNICIAN", "CASHIER"]),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

export async function createEmployee(
  data: EmployeeFormData
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN"]); // Only Admins can create employees
  const parsed = employeeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Validation failed" };
  }
  if (!parsed.data.password) {
    return { success: false, error: "Password is required for new employees" };
  }
  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    
    await prisma.employee.create({
      data: {
        email: parsed.data.email,
        passwordHash,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phoneNumber: parsed.data.phone || null,
        role: parsed.data.role,
        isActive: true,
      },
    });
    revalidatePath("/admin/staff");
    return { success: true };
  } catch (error) {
    console.error("Failed to create employee:", error);
    return { success: false, error: "Failed to create employee. Email may already exist." };
  }
}

export async function updateEmployee(
  id: string,
  data: Partial<EmployeeFormData>
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN"]); // Only Admins can update employees
  try {
    let passwordHash = undefined;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }
    
    await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        ...(data.email && { email: data.email }),
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.phone !== undefined && { phoneNumber: data.phone || null }),
        ...(data.role && { role: data.role }),
        ...(passwordHash && { passwordHash }),
      }
    });
      
    revalidatePath("/admin/staff");
    return { success: true };
  } catch (error) {
    console.error("Failed to update employee:", error);
    return { success: false, error: "Failed to update employee" };
  }
}

export async function deleteEmployee(
  id: string
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN"]); // Only Admins can delete employees
  try {
    const numericId = parseInt(id);
    
    await prisma.employee.delete({ where: { id: numericId } });
    revalidatePath("/admin/staff");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return { success: false, error: "Failed to delete employee" };
  }
}
