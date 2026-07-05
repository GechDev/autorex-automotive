"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "@/lib/validations/auth";

export async function loginAction(data: LoginInput) {
  try {
    const validatedData = loginSchema.parse(data);

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Login Error:", error);
    
    if (error?.message?.includes("NEXT_REDIRECT") || error?.digest?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong during login." };
      }
    }
    
    return { error: "Invalid email or password" };
  }
}

export async function registerAction(data: RegisterInput) {
  try {
    const validatedData = registerSchema.parse(data);
    
    const email = validatedData.email.toLowerCase();

    const existingEmployee = await prisma.employee.findUnique({
      where: { employee_email: email },
    });

    if (existingEmployee) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    let employeeRole = await prisma.companyRole.findUnique({
      where: { company_role_name: "Employee" }
    });

    if (!employeeRole) {
      employeeRole = await prisma.companyRole.create({
        data: { company_role_name: "Employee" }
      });
    }

    const [firstName, ...lastNameParts] = validatedData.name.split(" ");
    const lastName = lastNameParts.join(" ") || "";

    await prisma.employee.create({
      data: {
        employee_email: email,
        active_employee: 1,
        info: {
          create: {
            employee_first_name: firstName,
            employee_last_name: lastName,
            employee_phone: "",
          }
        },
        pass: {
          create: {
            employee_password_hashed: passwordHash,
          }
        },
        roles: {
          create: {
            company_role_id: employeeRole.company_role_id,
          }
        }
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to create account. Please try again." };
  }
}
