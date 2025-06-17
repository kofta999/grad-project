import SideBar from "@/components/sidebar";
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
  const role = cookies().get("role")?.value;

  if (role !== "admin" && role !== "student") {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[250px,1fr]">
      <aside className="sideNav">
        <SideBar role={role} />
      </aside>
      <main>{role === "admin" ? admin : student}</main>
    </div>
  );
}
