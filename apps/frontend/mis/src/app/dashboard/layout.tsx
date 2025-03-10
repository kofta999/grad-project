import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({
  student,
  admin,
}: {
  children: React.ReactNode;
  student: React.ReactNode;
  admin: React.ReactNode;
}) {
  const cookieStore = cookies();
  const roleCookie = cookieStore.get("userRole");
  const sessionCookie = cookieStore.get("sessionId");

  // Check for both cookies to ensure full authentication
  if (!roleCookie || !sessionCookie) {
    redirect("/login");
  }

  // Validate role is one we expect
  const role = roleCookie.value;
  console.log(role);
  if (role !== "admin" && role !== "student") {
    // Handle invalid role - could log this as potential tampering
    redirect("/login");
  }

  return role === "admin" ? admin : student;
}
