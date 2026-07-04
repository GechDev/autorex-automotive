import { auth } from "@/lib/auth";

export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("Unauthorized: You must be logged in.");
  }
  
  return session.user;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth();
  
  const upperAllowed = allowedRoles.map(r => r.toUpperCase());
  if (!upperAllowed.includes(user.role?.toUpperCase() || "")) {
    throw new Error("Forbidden: You do not have permission to perform this action.");
  }
  
  return user;
}
