"use client";
import { useParams } from "next/navigation";
import useApplicationDataForAdmin from "@/hooks/use-application-data-for-admin";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ApplicationDetails from "@/components/application/application-details";
import StudentDetails from "@/components/student/student-details";
import { STATUS } from "@/lib/types";

export default function Page() {
  const { id } = useParams();
  const { application, student } = useApplicationDataForAdmin(id as string);

  const router = useRouter();

  const handleEditStudent = (applicationId: number) => {
    router.push(`/dashboard/edit-student/${applicationId}`);
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
            بيانات التقديم ({STATUS[application.status]})
          </h1>

          {student && <StudentDetails student={student} />}
          <ApplicationDetails application={application} />
        </div>
      </div>
    )
  );
}
