"use client";

import { useState, useEffect } from "react";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";
import toast from "react-hot-toast";

type StudentApplications = InferResponseType<
  typeof apiClient.admin.applications.$get
>;

export default function StudentApplications() {
  const [applications, setApplications] = useState<StudentApplications>([]);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const DEGREE_MAP: Record<StudentApplications[0]["academicDegree"], string> = {
    diploma: "دبلوم",
    master: "ماجستير",
    phd: "دكتوراه",
  };

  // Fetch student applications from the API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await apiClient.admin.applications.$get();

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchApplications();
  }, []);

  const toggleSelectAll = () => {
    if (Object.keys(selectedRows).length === applications.length) {
      setSelectedRows({});
    } else {
      const newSelected: Record<string, boolean> = {};
      applications.forEach((app) => {
        newSelected[app.applicationId] = true;
      });
      setSelectedRows(newSelected);
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle accepting selected applications
  const handleAcceptSelected = () => {
    const selectedIds = Object.keys(selectedRows).filter(
      (id) => selectedRows[id],
    );

    if (selectedIds.length === 0) {
      toast.error("لم يتم اختيار أي طلبات.");
      return;
    }

    // For now, just log the selected IDs
    console.log("Selected applications to accept:", selectedIds);
    // apiClient.admin.applications.accept.$post({ json: { applicationId: 0 } });
    // Promise array -> evaluate at same time
    // Promise.all()
    toast.success(
      `تم اختيار ${selectedIds.length} طلبات. سيتم إضافة المنطق لاحقًا.`,
    );
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

      {/* Accept Selected Button */}
      {Object.keys(selectedRows).length > 0 && (
        <div className="mb-4 flex justify-end">
          <Button
            onClick={handleAcceptSelected}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            قبول الطلب({Object.keys(selectedRows).length})
          </Button>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-center w-12">
                <Checkbox
                  checked={
                    Object.keys(selectedRows).length === applications.length &&
                    applications.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="text-right">اسم الطالب</TableHead>
              <TableHead className="text-right">الدرجة العلمية</TableHead>
              <TableHead className="text-right">البرنامج الأكاديمي</TableHead>
              <TableHead className="text-center">قبول الطالب</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow
                key={application.applicationId}
                className="border-b h-12"
              >
                <TableCell className="p-2 text-center">
                  {application.studentName && (
                    <Checkbox
                      checked={!!selectedRows[application.applicationId]}
                      onCheckedChange={() =>
                        toggleSelectRow(application.applicationId)
                      }
                      aria-label={`Select ${application.studentName}`}
                    />
                  )}
                </TableCell>
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
          الصفحة التالية
        </Button>
      </div>
    </div>
  );
}
