import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecret";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ["/cart"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Auth routes that should redirect if already authenticated
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;

      // Check if token is expired
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    try {
      jwt.verify(token, SECRET_KEY);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      // Token is invalid, let them proceed to auth page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/login", "/signup"],
};
