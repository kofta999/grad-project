import Link from "next/link";
import ApplicationDetails from "./_components/application-details";
import { getServerApiClient } from "@/lib/client";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const apiClient = await getServerApiClient();
  const response = await apiClient.student.applications.$get();

  console.log(response);

  if (!response.ok) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto p-8 flex justify-center items-center flex-col gap-20">
        <h1 className="text-3xl">لم يتم التقديم هذا العام</h1>
        <Link href="/dashboard/applications">
          <Button className="text-xl px-8 py-6 bg-blue-600 hover:bg-blue-700">
            ابدأ تقديمك
          </Button>
        </Link>
      </div>
    );
  }

  const data = await response.json();
  const student = data.application;

  return <ApplicationDetails student={student} />;
}
