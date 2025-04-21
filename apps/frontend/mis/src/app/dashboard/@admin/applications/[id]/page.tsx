import ApplicationDetails from "@/app/dashboard/_components/application-details";
import StudentDetails from "@/app/dashboard/_components/student-details";
import { getServerApiClient } from "@/lib/client";

export default async function AdminPage({ params: { id } }: { params: { id: string } }) {
  const apiClient = await getServerApiClient();
  try {
    const response = await apiClient.admin.applications[":id"].$get({
      param: { id },
      query: {},
    });

    if (!response.ok) {
      throw new Error("التقديم غير موجود");
    }

    const { student, application } = await response.json();

    return (
      <>
        <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
          <div className="max-w-4xl mx-auto p-8">
            <div className="relative flex justify-center items-center">
              <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
                بيانات التقديم ({application?.isAccepted ? "مقبول" : "تحت المراجعة"})
              </h1>
            </div>

            <StudentDetails student={student!} />
            <ApplicationDetails application={application!} />
          </div>
        </div>
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error.message);
    } else {
      console.error("حدث خطأ غير متوقع:", error);
    }

    return <div>لا توجد بيانات للطالب.</div>;
  }
}
