"use client";
import SideBar from "@/components/sidebar";
import { useUserContext } from "@/context/user-context";
import { redirect } from "next/navigation";

export default function Layout({
  student,
  admin,
}: {
  children: React.ReactNode;
  student: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { loggedInUser } = useUserContext();
  console.log({ loggedInUser });
  // Get the current path
  // const pathname = headers().get("x-pathname") || "";

  if (!loggedInUser) {
    redirect("/login");
  }

  // Validate role
  const role = loggedInUser.role;
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
