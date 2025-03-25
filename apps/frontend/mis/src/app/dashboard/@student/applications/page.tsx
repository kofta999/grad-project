import { getServerApiClient } from "@/lib/client";
import ApplicationForm from "./_components/application-form";
import { redirect } from "next/navigation";

async function getInitialData() {
  const apiClient = await getServerApiClient();
  const [defaultDepartments, currentAcademicYears] = await Promise.all([
    apiClient.student.applications.availableDepartments.$get({
      query: { type: "diploma" },
    }),
    apiClient.student.applications.currentAcademicYears.$get(),
  ]);

  return { defaultDepartments, currentAcademicYears };
}

export default async function Page() {
  const apiClient = await getServerApiClient();
  const response = await apiClient.student.applications.$get();

  if (response.ok) {
    redirect("/dashboard");
  } else {
    return <ApplicationForm />;
  }
}
