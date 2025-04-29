"use client";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ApplicationsList = InferResponseType<typeof apiClient.applications.$get>;

export default function ApplicationsList({
  applicationsList,
  setApplicationsList,
}: {
  applicationsList: ApplicationsList;
  setApplicationsList: (applications: ApplicationsList) => void;
}) {
  const router = useRouter();
  const DEGREE_MAP: Record<ApplicationsList[0]["academicDegree"], string> = {
    diploma: "دبلوم",
    master: "ماجستير",
    phd: "دكتوراه",
  };

  // Handle accepting an application
  const handleAcceptApplication = async (applicationId: number) => {
    try {
      // Send the applicationId to the API
      const res = await apiClient.applications.accept.$post({
        json: { applicationId },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Update the application status in the UI
      setApplicationsList((prevApplications: ApplicationsList) =>
        prevApplications.map((app) => {
          return app.applicationId === applicationId ? { ...app, isAdminAccepted: true } : app;
        })
      );

      // Show success message
      toast.success(`تم قبول طلب الطالب ذو الرقم ${applicationId}.`);
    } catch (err) {
      console.error("Failed to accept application:", err);
      toast.error("فشل في قبول الطلب. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleEditStudent = (applicationId: number) => {
    router.push(`/dashboard/update/${applicationId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
          <span className="sr-only">Filter</span>
        </Button>

        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-semibold">تقديمات الطلاب</h1>
        </div>

        <div className="w-10"></div>
      </div>

      <div className="overflow-x-auto">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-right">اسم الطالب</TableHead>
              <TableHead className="text-right">الدرجة العلمية</TableHead>
              <TableHead className="text-right">البرنامج الأكاديمي</TableHead>
              <TableHead className="text-center">قبول الطالب</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicationsList.length === 0 && (
              <TableRow className="border-b h-12">
                <TableCell colSpan={4} className="text-center">
                  لا يوجد طلاب
                </TableCell>
              </TableRow>
            )}
            {applicationsList.map((application) => (
              <TableRow key={application.applicationId} className="border-b h-12">
                <TableCell>
                  <Link href={`/dashboard/applications/${application.applicationId}`}>
                    {application.studentName ? (
                      <div className="font-medium hover:underline">{application.studentName}</div>
                    ) : (
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    )}
                  </Link>
                </TableCell>
                <TableCell>
                  {application.academicDegree ? (
                    DEGREE_MAP[application.academicDegree]
                  ) : (
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </TableCell>
                <TableCell>
                  {application.department ? (
                    application.department
                  ) : (
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditStudent(application.applicationId)}
                    className="bg-mainColor/95 py-1 px-2 text-sm rounded w-full text-center text-white hover:bg-mainColor transition-colors duration-200"
                  >
                    تعديل بيانات الطالب
                  </Button>
                </TableCell>
                <TableCell>
                  {application.studentName ? (
                    <Button
                      onClick={() => handleAcceptApplication(application.applicationId)}
                      disabled={application.isAdminAccepted}
                      className="bg-gray-100 py-1 px-2 text-sm rounded w-full text-center text-black hover:bg-gray-200 transition-colors duration-200"
                    >
                      {application.isAdminAccepted ? "مقبول" : "قبول"}
                    </Button>
                  ) : (
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" />
          الصفحة التالية
        </Button>
      </div>
    </div>
  );
}
