import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    authorized: async ({ auth }) => !!auth?.user,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const employee = await prisma.employee.findUnique({
          where: { employee_email: email },
          include: { pass: true, roles: { include: { role: true } }, info: true }
        });

        if (!employee || !employee.pass?.employee_password_hashed) return null;

        const valid = await bcrypt.compare(password, employee.pass.employee_password_hashed);
        if (!valid) return null;

        const roleName = employee.roles[0]?.role?.company_role_name || "Employee";

        return {
          id: employee.employee_id.toString(),
          email: employee.employee_email,
          name: `${employee.info?.employee_first_name || ''} ${employee.info?.employee_last_name || ''}`.trim(),
          role: roleName,
        };
      },
    }),
  ],
});