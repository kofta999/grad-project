import { hcWithType } from "@repo/mis-api";
import Cookies from "js-cookie";

const customFetch: typeof fetch = async (input, init) => {
  const currentHeaders = new Headers(init?.headers);
  const authToken = Cookies.get("jwtToken");

  currentHeaders.set("Authorization", `Bearer ${authToken}`);
  const response = await fetch(input, { ...init, headers: currentHeaders });
  if (response.status === 401 && authToken) {
    console.log("here");
    console.warn("API client (dynamic) returned 401. Logging out.");
    Cookies.remove("jwtToken");
    Cookies.remove("role");
    localStorage.removeItem("loggedInUser");
    window.location.reload();
    // Potentially throw to signal failure upstream
    // throw new Error("Unauthorized - Logged out");
  }
  return response;
};

// Base client for browser use
export const apiClient = hcWithType(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
  init: { credentials: "include" },
  fetch: customFetch,
});

// Server-only API client that forwards cookies
export async function getServerApiClient() {
  if (typeof window === "undefined") {
    try {
      return hcWithType("http://localhost:3000", {
        init: { credentials: "include" },
        fetch: customFetch,
      });
    } catch (e) {
      console.warn("Failed to get cookies in server context", e);
    }
  }

  // Return standard client as fallback
  return apiClient;
}
