import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiClient } from "./lib/client";

export async function middleware(request: NextRequest) {
  // Skip authentication check for login page to avoid redirect loops
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  try {
    // Make a request to your authentication check endpoint
    // You can use a HEAD request which is lightweight (no response body needed)
    const authCheckResponse = await apiClient.index.$get(
      {},
      {
        init: {
          method: "HEAD",
          headers: {
            Cookie: request.headers.get("cookie") || "",
          },
        },
      },
    );

    // If auth check is successful, continue with the request
    if (authCheckResponse.ok) {
      const response = NextResponse.next();
      // Add the current pathname as a custom header if needed
      response.headers.set("x-pathname", request.nextUrl.pathname);
      return response;
    }
  } catch (error) {
    console.error("Auth check failed:", error);
  }

  // If we're here, either the auth check failed or an error occurred
  // Clear the authentication cookies and redirect to login
  const response = NextResponse.redirect(new URL("/login", request.url));

  // Clear cookies by setting them to empty with past expiration
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

export const config = {
  matcher: [
    // Apply to all routes except public assets, api routes, etc.
    "/((?!_next/static|_next/image|favicon.ico|api/auth/check).*)",
  ],
};
