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
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";

type ApplicationsListProps = InferResponseType<
  typeof apiClient.admin.applications.$get
>;

export default function ApplicationsList({
  applicationsList,
}: {
  applicationsList: ApplicationsListProps;
}) {
  // const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const DEGREE_MAP: Record<ApplicationsListProps[0]["academicDegree"], string> =
    {
      diploma: "دبلوم",
      master: "ماجستير",
      phd: "دكتوراه",
    };

  // const toggleSelectAll = () => {
  //   if (Object.keys(selectedRows).length === applicationsList.length) {
  //     setSelectedRows({});
  //   } else {
  //     const newSelected: Record<string, boolean> = {};
  //     applicationsList.forEach((app) => {
  //       newSelected[app.applicationId] = true;
  //     });
  //     setSelectedRows(newSelected);
  //   }
  // };

  // const toggleSelectRow = (id: number) => {
  //   setSelectedRows((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

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
              {/* <TableHead className="text-center w-12">
                <Checkbox
                  checked={
                    Object.keys(selectedRows).length === applicationsList.length &&
                    applicationsList.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead> */}
              <TableHead className="text-right">اسم الطالب</TableHead>
              <TableHead className="text-right">الدرجة العلمية</TableHead>
              <TableHead className="text-right">البرنامج الأكاديمي</TableHead>
              <TableHead className="text-center">قبول الطالب</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicationsList.map((application) => (
              <TableRow
                key={application.applicationId}
                className="border-b h-12"
              >
                {/* <TableCell className="p-2 text-center">
                  {application.studentName && (
                    <Checkbox
                      checked={!!selectedRows[application.applicationId]}
                      onCheckedChange={() =>
                        toggleSelectRow(application.applicationId)
                      }
                      aria-label={`Select ${application.studentName}`}
                    />
                  )}
                </TableCell> */}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" />
          الصفحة السابقة
        </Button>
      </div>
    </div>
  );
}
