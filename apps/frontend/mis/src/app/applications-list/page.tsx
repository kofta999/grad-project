"use client";

import { useState, useEffect } from "react";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { hcWithType } from "@repo/mis-api";

const client = hcWithType("https://127.0.0.1:3000");

interface StudentApplication {
  id: string;
  name: string;
  academicDegree: string;
  academicProgram: string;
  status: "pending" | "accepted" | "rejected";
}

export default function StudentApplications() {
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  // Fetch student applications from the API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await client.applications.$post({
          json: {
            qualification: {
              type: "example-type",
              date: "2023-01-01",
              faculty: "example-faculty",
              country: "example-country",
              university: "example-university",
              qualification: "example-qualification",
              specialization: "example-specialization",
              year: "2023",
              creditHours: true,
              grade: "A",
              gpa: "3.8",
            },
            permanentAddress: {
              fullAddress: "example-full-address",
              country: "example-country",
              city: "example-city",
            },
            currentAddress: {
              fullAddress: "example-full-address",
              country: "example-country",
              city: "example-city",
            },
            registration: {
              academicYearId: 1,
              faculty: "example-faculty",
              academicDegree: "example-degree",
              academicProgram: "example-program",
            },
            emergencyContact: {
              name: "example-name",
              phoneNumber: "1234567890",
              email: "example@example.com",
              address: "example-address",
            },
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        // Map the API response to the StudentApplication interface
        const mappedApplications: StudentApplication[] = data.map((item: any) => ({
          id: item.id, // Assuming the API returns an ID
          name: item.emergencyContact?.name || "Unknown", // Use emergency contact name as the student name
          academicDegree: item.registration.academicDegree,
          academicProgram: item.registration.academicProgram,
          status: "pending", // Default status (you can update this based on API data)
        }));

        setApplications(mappedApplications);
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
        newSelected[app.id] = true;
      });
      setSelectedRows(newSelected);
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
          <span className="sr-only">Filter</span>
        </Button>

        <h1 className="text-xl font-semibold text-center">تقديمات الطلاب</h1>

        <Button variant="ghost" size="icon">
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-center w-12">
                <Checkbox
                  checked={Object.keys(selectedRows).length === applications.length && applications.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="text-right">اسم الطالب</TableHead>
              <TableHead className="text-right">الدرجة العلمية</TableHead>
              <TableHead className="text-right">البرنامج الأكاديمي</TableHead>
              <TableHead className="text-right">قبول الطالب</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} className="border-b h-12">
                <TableCell className="p-2 text-center">
                  {application.name && (
                    <Checkbox
                      checked={!!selectedRows[application.id]}
                      onCheckedChange={() => toggleSelectRow(application.id)}
                      aria-label={`Select ${application.name}`}
                    />
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {application.name ? (
                    <div className="font-medium">{application.name}</div>
                  ) : (
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {application.academicDegree ? (
                    application.academicDegree
                  ) : (
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {application.academicProgram ? (
                    application.academicProgram
                  ) : (
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {application.name ? (
                    <div className="bg-gray-100 py-1 px-2 text-sm rounded text-center">
                      {application.status === "accepted" ? "مقبول" : "قيد المراجعة"}
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