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

    const employee = await prisma.employee.findUnique({
      where: { email: validatedData.email },
      select: { role: true }
    });

    return { success: true, role: employee?.role };
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
      where: { email: email },
    });

    if (existingEmployee) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    const [firstName, ...lastNameParts] = validatedData.name.split(" ");
    const lastName = lastNameParts.join(" ") || "";

    await prisma.employee.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        firstName: firstName,
        lastName: lastName,
        role: "CASHIER",
        isActive: true,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to create account. Please try again." };
  }
}
