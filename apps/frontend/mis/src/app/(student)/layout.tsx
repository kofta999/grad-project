"use client";

import { useUserContext } from "@/context/UserContext";
import { notFound } from "next/navigation";
import SideNav from "@/app/_navbar/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useUserContext();

  if (!loggedInUser || loggedInUser.role !== "student") {
    notFound();
  }

  return children;
}
