import SideBar from "@/components/sidebar";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

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

  // Get the current path
  const pathname = headers().get("x-pathname") || "";
  const isBaseRoute = pathname === "/dashboard";

  if (!roleCookie || !sessionCookie) {
    // Only redirect to login from the base dashboard route
    if (isBaseRoute) {
      redirect("/login");
    } else {
      // For all other routes, return 404 to avoid revealing route existence
      notFound();
    }
  }

  // Validate role
  const role = roleCookie.value;
  if (role !== "admin" && role !== "student") {
    // Same security pattern for invalid roles
    if (isBaseRoute) {
      redirect("/login");
    } else {
      notFound();
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[250px,1fr]">
      <aside className="sideNav">
        <SideBar role={role} />
      </aside>
      <main className="py-14 xl:py-6">{role === "admin" ? admin : student}</main>
    </div>
  );
}
