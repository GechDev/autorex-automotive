"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth-utils";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export async function createService(
  data: ServiceFormData
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN", "ADVISOR"]);
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Validation failed" };
  }
  try {
    await prisma.commonService.create({ 
      data: {
        name: parsed.data.name,
        description: parsed.data.description || ""
      } 
    });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { success: false, error: "Failed to create service." };
  }
}

export async function updateService(
  id: string,
  data: Partial<ServiceFormData>
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN", "ADVISOR"]);
  try {
    const numId = parseInt(id);
    await prisma.commonService.update({ 
      where: { id: numId }, 
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
      } 
    });
    revalidatePath("/admin/services");
    revalidatePath(`/admin/services/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { success: false, error: "Failed to update service" };
  }
}

export async function deleteService(
  id: string
): Promise<{ success: boolean; error?: string }> {
  await requireRole(["ADMIN", "ADVISOR"]);
  try {
    const numId = parseInt(id);
    await prisma.commonService.delete({ where: { id: numId } });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, error: "Failed to delete service" };
  }
}
