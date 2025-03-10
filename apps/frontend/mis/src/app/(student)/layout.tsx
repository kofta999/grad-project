"use client";

import { useUserContext } from "@/context/UserContext";
import { notFound } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, loggedInUser } = useUserContext();

  if (!isLoading && (!loggedInUser || loggedInUser.role !== "student")) {
    notFound();
  }

  if (isLoading) {
    return;
  }

  console.log(loggedInUser);
  return children;
}
