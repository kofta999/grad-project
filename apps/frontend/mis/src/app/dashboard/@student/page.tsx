import Link from "next/link";
import ApplicationDetails from "../../_components/application-details";
import { getServerApiClient } from "@/lib/client";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const apiClient = await getServerApiClient();
  const response = await apiClient.students.me.applications.$get();

  if (!response.ok) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto p-8 flex justify-center items-center flex-col gap-20">
        <h1 className="text-3xl">لم يتم التقديم هذا العام</h1>
        <Link href="/dashboard/applications">
          <Button className="text-xl px-8 py-6 bg-blue-600 hover:bg-blue-700">ابدأ تقديمك</Button>
        </Link>
      </div>
    );
  }

  const data = await response.json();
  const application = data.application;

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
        <div className="max-w-4xl mx-auto p-8">
          <div className="relative flex justify-center items-center">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
              بيانات التقديم ({application?.isAccepted ? "مقبول" : "تحت المراجعة"})
            </h1>
          </div>

          <ApplicationDetails application={application!} />
        </div>
      </div>
    </>
  );
}
