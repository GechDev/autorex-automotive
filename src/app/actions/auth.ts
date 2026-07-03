"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "@/lib/validations/auth";
import { UserRole } from "@/generated/prisma/enums";

export async function loginAction(data: LoginInput) {
  try {
    const validatedData = loginSchema.parse(data);

    // Call NextAuth signIn
    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false, // We'll handle redirection on the client
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong during login." };
      }
    }
    
    // Zod errors or other errors
    return { error: "Invalid email or password" };
  }
}

export async function registerAction(data: RegisterInput) {
  try {
    const validatedData = registerSchema.parse(data);
    
    // Normalize email
    const email = validatedData.email.toLowerCase();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Don't reveal account existence for security, or show generic message
      return { error: "An account with this email already exists." };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    // Create user (default role is EMPLOYEE as per schema, but let's enforce it)
    await prisma.user.create({
      data: {
        name: validatedData.name,
        email,
        passwordHash,
        role: UserRole.EMPLOYEE, // Force least-privileged role
      },
    });

    // We can auto-login after register or just tell client to redirect to login
    return { success: true };
  } catch (error) {
    return { error: "Failed to create account. Please try again." };
  }
}
