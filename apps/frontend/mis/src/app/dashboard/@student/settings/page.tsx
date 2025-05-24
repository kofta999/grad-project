"use client";
import useUser from "@/hooks/use-user";
import { redirect } from "next/navigation";
import Settings from "@/components/student/student-settings";

export default function Page() {
  const { applicationData } = useUser();

  if (applicationData?.status === "accepted") {
    redirect("/dashboard");
  }

  if (!applicationData) {
    return;
  }

  return <Settings />;
}
