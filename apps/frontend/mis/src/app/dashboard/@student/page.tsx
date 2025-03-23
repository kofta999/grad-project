import ApplicationDetails from "./_components/application-details";
import { getServerApiClient } from "@/lib/client";

export default async function Page() {
  const apiClient = await getServerApiClient();
  const response = await apiClient.student.applications.$get();

  if (!response.ok) {
    // Handle errors
    const data = await response.json();
    throw new Error(data.message || "Failed to fetch application details");
  }

  const data = await response.json();
  const student = data.application;

  if (!student) {
    return <div>لا توجد بيانات للطالب.</div>;
  }

  return <ApplicationDetails student={student} />;
}
