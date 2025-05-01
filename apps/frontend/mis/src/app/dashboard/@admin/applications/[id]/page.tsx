"use client";
import { useParams } from "next/navigation";
import StudentDetails from "@/app/_components/student-details";
import ApplicationDetails from "@/app/_components/application-details";
import useApplicationDataForAdmin from "@/Hooks/useApplicationDataForAdmin";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function dataPage() {
  const { id } = useParams();
  const { application, student } = useApplicationDataForAdmin(id as string);

  const router = useRouter();

  const handleEditStudent = (applicationId: number) => {
    router.push(`/dashboard/update/${applicationId}`);
  };

  return (
    application && (
      <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end">
            <Button
              onClick={() => handleEditStudent(application?.applicationId)}
              className="bg-mainColor/95 py-1 px-2 text-sm rounded w-[200px] right-full text-center text-white hover:bg-mainColor transition-colors duration-200"
            >
              تعديل بيانات الطالب
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-center text-blue-600 mt-8">
            بيانات التقديم ({application.isAccepted ? "مقبول" : "تحت المراجعة"})
          </h1>

          {student && <StudentDetails student={student} />}
          <ApplicationDetails application={application} />
        </div>
      </div>
    )
  );
}
