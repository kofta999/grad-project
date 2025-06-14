import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const sessionCookie = cookies().get("sessionId");
  const userRole = cookies().get("userRole");

  // If user is already logged in, redirect them
  if (sessionCookie && userRole) {
    redirect("/dashboard");
  }

  return children;
}
