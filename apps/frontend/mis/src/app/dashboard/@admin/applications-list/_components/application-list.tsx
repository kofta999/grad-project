"use client";
import { useState } from "react";
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

type ApplicationsList = InferResponseType<
  typeof apiClient.admin.applications.$get
>;

export default function ApplicationsList({
  applicationsList,
}: {
  applicationsList: ApplicationsList;
}) {
  const [applications, setApplications] = useState(applicationsList);

  const DEGREE_MAP: Record<ApplicationsList[0]["academicDegree"], string> = {
    diploma: "دبلوم",
    master: "ماجستير",
    phd: "دكتوراه",
  };

  // Handle accepting an application
  const handleAcceptApplication = async (applicationId: number) => {
    try {
      // Send the applicationId to the API
      const res = await apiClient.admin.applications.accept.$post({
        json: { applicationId },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Update the application status in the UI
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.applicationId === applicationId
            ? { ...app, isAdminAccepted: true }
            : app,
        ),
      );

      // Show success message
      toast.success(`تم قبول طلب الطالب ذو الرقم ${applicationId}.`);
    } catch (err) {
      console.error("Failed to accept application:", err);
      toast.error("فشل في قبول الطلب. الرجاء المحاولة مرة أخرى.");
    }
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
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow
                key={application.applicationId}
                className="border-b h-12"
              >
                <TableCell>
                  {application.studentName ? (
                    <div className="font-medium">{application.studentName}</div>
                  ) : (
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  )}
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
                  {application.studentName ? (
                    <div className="bg-gray-100 py-1 px-2 text-sm rounded text-center">
                      {application.isAdminAccepted ? "مقبول" : "قيد المراجعة"}
                    </div>
                  ) : (
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() =>
                      handleAcceptApplication(application.applicationId)
                    }
                    className="bg-green-700 hover:bg-green-600 text-white"
                  >
                    قبول
                  </Button>
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
