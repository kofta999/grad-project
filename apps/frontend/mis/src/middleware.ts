import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiClient } from "./lib/client";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isDashboardPage = pathname.startsWith("/dashboard") || pathname === "/";

  try {
    // Check authentication status
    const authCheckResponse = await apiClient.index.$get(
      {},
      {
        init: {
          method: "HEAD",
          headers: {
            Cookie: request.headers.get("cookie") || "",
          },
        },
      }
    );

    const isAuthenticated = authCheckResponse.ok;

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (isAuthenticated && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user is not authenticated and trying to access dashboard pages, redirect to login
    if (!isAuthenticated && isDashboardPage) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      // Clear cookies
      response.cookies.set("sessionId", "", {
        expires: new Date(0),
        path: "/",
      });

      response.cookies.set("userRole", "", {
        expires: new Date(0),
        path: "/",
      });

      return response;
    }

    // For all other cases, proceed normally
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  } catch (error) {
    console.error("Auth check failed:", error);

    // Only redirect to login if trying to access protected routes
    if (isDashboardPage) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      // Clear cookies
      response.cookies.set("sessionId", "", {
        expires: new Date(0),
        path: "/",
      });

      response.cookies.set("userRole", "", {
        expires: new Date(0),
        path: "/",
      });

      return response;
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Match login, register, dashboard routes and root path
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};
