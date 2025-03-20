import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Create a new response
  const response = NextResponse.next();

  // Add the current pathname as a custom header
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes
    "/(.*)",
  ],
};
