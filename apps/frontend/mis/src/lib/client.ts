import { hcWithType } from "@repo/mis-api";

// Base client for browser use
export const apiClient = hcWithType(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
  init: { credentials: "include" },
});

// Server-only API client that forwards cookies
export async function getServerApiClient() {
  // Only import cookies() in a server context
  if (typeof window === "undefined") {
    try {
      // Dynamic import to prevent it from being included in client bundles
      const { cookies } = await import("next/headers");
      const cookieStore = cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      return hcWithType("http://localhost:3000", {
        init: { credentials: "include" },
        headers: {
          Cookie: cookieHeader,
        },
      });
    } catch (e) {
      console.warn("Failed to get cookies in server context", e);
    }
  }

  // Return standard client as fallback
  return apiClient;
}
