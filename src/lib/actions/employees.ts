"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { UserRole } from "@/generated/prisma/enums";

const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(UserRole),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

export async function createEmployee(
  data: EmployeeFormData
): Promise<{ success: boolean; error?: string }> {
  const parsed = employeeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Validation failed" };
  }
  if (!parsed.data.password) {
    return { success: false, error: "Password is required for new employees" };
  }
  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        role: parsed.data.role,
        passwordHash,
      },
    });
    revalidatePath("/admin/employees");
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
  try {
    const updateData: { name?: string; email?: string; role?: UserRole; passwordHash?: string } = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.role) updateData.role = data.role;
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await prisma.user.update({ where: { id }, data: updateData });
    revalidatePath("/admin/employees");
    return { success: true };
  } catch (error) {
    console.error("Failed to update employee:", error);
    return { success: false, error: "Failed to update employee" };
  }
}

export async function deleteEmployee(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/employees");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return { success: false, error: "Failed to delete employee" };
  }
}
