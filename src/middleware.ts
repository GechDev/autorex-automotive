import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoggedIn = !!req.auth?.user;

  if (isAdminRoute) {
    if (!isLoggedIn) {
      const signInUrl = new URL("/login", req.nextUrl.origin);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    const userRole = req.auth?.user?.role;
    const allowedRoles = ["ADMIN", "MANAGER", "EMPLOYEE"];

    if (!userRole || !allowedRoles.includes(userRole.toUpperCase())) {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};