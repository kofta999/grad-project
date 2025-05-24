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
  console.log(application);

  const router = useRouter();

  const handleEditStudent = (applicationId: number) => {
    router.push(`/dashboard/edit-student/${applicationId}`);
  };

  const handleRegisterCourses = (applicationId: number) => {
    router.push(`/dashboard/course-registrations?applicationId=${applicationId}`);
  };

  return (
    application && (
      <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-end gap-2">
            <Button
              onClick={() => handleEditStudent(application.applicationId)}
              className="bg-green-600 py-1 px-2 text-sm rounded w-[200px] text-center text-white hover:bg-green-700 transition-colors duration-200"
            >
              تعديل بيانات الطالب
            </Button>

            {application.status === "accepted" && (
              <Button
                onClick={() => handleRegisterCourses(application.applicationId)}
                className="bg-mainColor py-1 px-2 text-sm rounded w-[200px] text-center text-white transition-colors duration-200"
              >
                تسجيل المواد للطالب
              </Button>
            )}
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
