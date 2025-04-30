"use client";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";

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

  return (
    <Container>
      {/* Card container for the section */}
      <Card>
        <CardContent>
          <CardHeader>
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-center">تقديمات الطلاب</h1>
          </CardHeader>

          <CardContent>
            {/* Table container */}
            <div className="overflow-x-auto">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="text-right">اسم الطالب</TableHead>
                    <TableHead className="text-right">الدرجة العلمية</TableHead>
                    <TableHead className="text-right">البرنامج الأكاديمي</TableHead>
                    <TableHead className="text-center">حالة الطالب</TableHead>
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
                    <TableRow
                      onClick={() =>
                        router.push(`/dashboard/applications/${application.applicationId}`)
                      }
                      key={application.applicationId}
                      className="border-b h-12 cursor-pointer"
                    >
                      <TableCell>
                        {application.studentName ? (
                          <div className="font-medium hover:underline">
                            {application.studentName}
                          </div>
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
          </CardContent>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              الصفحة التالية
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
