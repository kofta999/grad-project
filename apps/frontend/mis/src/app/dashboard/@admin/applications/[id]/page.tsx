"use client"
import { useParams } from "next/navigation";
import StudentDetails from "@/app/_components/student-details";
import ApplicationDetails from "@/app/_components/application-details";
import useApplicationDataForAdmin from "@/Hooks/useApplicationDataForAdmin";

export default function dataPage() {
  const { id } = useParams();
  const { application, student } = useApplicationDataForAdmin(id as string);

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto p-8">
        <div className="relative flex justify-center items-center">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
            بيانات التقديم ({application?.isAccepted ? "مقبول" : "تحت المراجعة"})
          </h1>
        </div>

        {student && <StudentDetails student={student} />}
        {application && <ApplicationDetails application={application} />}
      </div>
    </div>
  );
}
