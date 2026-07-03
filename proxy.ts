import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Check for NextAuth session cookies
  const hasSession = request.cookies.has("authjs.session-token") || 
                    request.cookies.has("__Secure-authjs.session-token");

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!hasSession) {
      // Redirect to login with callback URL
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent authenticated users from accessing auth pages
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
  if (authRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
