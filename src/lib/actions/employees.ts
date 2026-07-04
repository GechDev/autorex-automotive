"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Admin", "Manager", "Employee"]),
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
    
    let companyRole = await prisma.companyRole.findUnique({
      where: { company_role_name: parsed.data.role }
    });

    if (!companyRole) {
      companyRole = await prisma.companyRole.create({
        data: { company_role_name: parsed.data.role }
      });
    }

    await prisma.employee.create({
      data: {
        employee_email: parsed.data.email,
        active_employee: 1,
        info: {
          create: {
            employee_first_name: parsed.data.firstName,
            employee_last_name: parsed.data.lastName,
            employee_phone: parsed.data.phone || "",
          }
        },
        pass: {
          create: {
            employee_password_hashed: passwordHash,
          }
        },
        roles: {
          create: {
            company_role_id: companyRole.company_role_id,
          }
        }
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
    let passwordHash = undefined;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }
    
    // Convert logic for updating employee fields
    const employee = await prisma.employee.findUnique({
      where: { employee_id: parseInt(id) },
      include: { info: true }
    });
    
    if (employee) {
      await prisma.employee.update({
        where: { employee_id: parseInt(id) },
        data: {
          ...(data.email && { employee_email: data.email }),
          ...(data.name && {
            info: {
              update: {
                employee_first_name: data.name.split(" ")[0],
                employee_last_name: data.name.split(" ").slice(1).join(" ") || "",
              }
            }
          }),
          ...(passwordHash && {
            pass: {
              update: {
                employee_password_hashed: passwordHash
              }
            }
          })
        }
      });
      
      if (data.role) {
         let companyRole = await prisma.companyRole.findUnique({
           where: { company_role_name: data.role }
         });
         if (companyRole) {
           await prisma.employeeRole.deleteMany({
             where: { employee_id: parseInt(id) }
           });
           await prisma.employeeRole.create({
             data: {
               employee_id: parseInt(id),
               company_role_id: companyRole.company_role_id
             }
           });
         }
      }
    }
    
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
    const numericId = parseInt(id);
    
    // First delete associated records manually (if cascading is not set up correctly)
    await prisma.employeeInfo.deleteMany({ where: { employee_id: numericId } });
    await prisma.employeePass.deleteMany({ where: { employee_id: numericId } });
    await prisma.employeeRole.deleteMany({ where: { employee_id: numericId } });
    
    await prisma.employee.delete({ where: { employee_id: numericId } });
    revalidatePath("/admin/employees");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return { success: false, error: "Failed to delete employee" };
  }
}
