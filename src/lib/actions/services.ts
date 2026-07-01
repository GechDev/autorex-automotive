"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const serviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export async function createService(
  data: ServiceFormData
): Promise<{ success: boolean; error?: string }> {
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    await prisma.service.create({ data: parsed.data });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { success: false, error: "Failed to create service. Slug may already exist." };
  }
}

export async function updateService(
  id: string,
  data: Partial<ServiceFormData>
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.service.update({ where: { id }, data });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { success: false, error: "Failed to update service" };
  }
}

export async function toggleServiceActive(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.service.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update service" };
  }
}

export async function deleteService(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, error: "Failed to delete service" };
  }
}
