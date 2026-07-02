import { auth } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/enums";

export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("Unauthorized: You must be logged in.");
  }
  
  return session.user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  
  if (!allowedRoles.includes(user.role as UserRole)) {
    throw new Error("Forbidden: You do not have permission to perform this action.");
  }
  
  return user;
}
