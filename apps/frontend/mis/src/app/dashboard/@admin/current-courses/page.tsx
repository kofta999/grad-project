"use client";
import { Container } from "@/components/ui/container";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchBar } from "@/components/ui/search";
import { Card } from "@/components/ui/card";
import { CardGrid } from "@/components/ui/card";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiClient } from "@/lib/client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import logCourses from "../current-courses/log-courses/page";
import { X } from "lucide-react";

type Course = {
  course_id: number;
  code: string;
  title: string;
  prerequisite: number;
  totalHours: number;
  grade?: string;
};

type CoursesType = Course[];

type StudentType = {
  fullNameAr?: string;
  dob?: string;
  idNumber?: string;
  phoneNoMain?: string;
};

type ApplicationType = {
  registration?: {
    academicYearId?: number;
    academicDegree?: string;
  };
};

type SemesterType = "first" | "second" | "third";

export default function currentCourses() {
  const [student, setStudent] = useState<StudentType>({});
  const [application, setApplication] = useState<ApplicationType>({});

  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [academicYear, setAcademicYear] = useState<number | null>(null);
  const [semester, setSemester] = useState<SemesterType | null>(null);

  const [courses, setCourses] = useState<CoursesType>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getUser = async (id: number | null) => {
    // Check if id is null or invalid
    if (id === null || id === 0) {
      // Reset states if the search input is cleared
      setStudent({});
      setApplication({});
      setAcademicYear(null);
      return;
    }

    try {
      const res = await apiClient.admin.applications[":id"].$get({
        param: { id: id.toString() },
        query: {},
      });
      if (res.status === 200) {
        const data = await res.json();
        // Data WILL be there
        setStudent(data.student!);
        setApplication(data.application!);
        setAcademicYear(data.application?.registration?.academicYearId!);
      } else {
        toast.error("مستخدم غير موجود");

        setStudent({});
        setApplication({});
        setAcademicYear(null);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("فشل العثور علي المستخدم");
    }
  };

  const getCourses = async (
    applicationId: number,
    semester: SemesterType,
    academicYearId: number,
  ) => {
    if (!applicationId || !semester || !academicYearId) {
      setCourses([]);
      return;
    }
    try {
      const res = await apiClient.admin.courses.list.$post({
        json: {
          applicationId: applicationId,
          semester: semester,
          academicYearId: academicYearId,
        },
      });

      if (res.status == 200) {
        const data = await res.json();
        setCourses(data);
      } else {
        toast.error("فشل العثور علي المواد");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("فشل العثور علي المواد");
    }
  };

  const handleSearch = (applicationId: string) => {
    const id = applicationId ? Number(applicationId) : null;
    setApplicationId(id);
    getUser(id);
  };

  useEffect(() => {
    if (applicationId && semester && academicYear) {
      getCourses(applicationId, semester, academicYear);
    } else {
      setCourses([]);
    }
  }, [applicationId, semester, academicYear]);

  return (
    <Container>
      <SearchBar
        placeholder="ابحث هنا..."
        onChange={(value) => handleSearch(value)}
      />
      <Card>
        <CardContent>
          <div className="flex flex-col mb-6 md:flex-row md:gap-6">
            <div className="image-Container border-2 border-mainColor rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/avatar.jpg"
                alt="placeholder"
                width={120}
                height={120}
              />
            </div>
            <CardGrid className="mt-6 md:mt-0">
              <p className="text-sm">الاسم / {student?.fullNameAr}</p>
              <p className="text-sm">تاريخ الميلاد / {student?.dob}</p>
              <p className="text-sm">الرقم القومي / {student?.idNumber}</p>
              <p className="text-sm">
                الدرجة العلمية / {application.registration?.academicDegree}
              </p>
              <p className="text-sm">رقم الهاتف / {student?.phoneNoMain}</p>
              <p className="text-sm">
                العام الاكاديمي للتسجيل /{" "}
                {application.registration?.academicYear}
              </p>
            </CardGrid>
          </div>
          <Select
            className="w-full md:w-1/2"
            onValueChange={(value: "first" | "second" | "third") => {
              setSemester(value);
            }}
          >
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="اختر الترم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first">الأول</SelectItem>
              <SelectItem value="second">الثاني</SelectItem>
              <SelectItem value="third">الصيفي</SelectItem>
            </SelectContent>
          </Select>
          <Table className="border rounded-md mt-6">
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead className="text-right font-medium text-[#96A0B6] w-1/4">
                  اسم المقرر
                </TableHead>
                <TableHead className="text-right font-medium text-[#96A0B6] w-1/4">
                  كود المقرر
                </TableHead>
                <TableHead className="text-right font-medium text-[#96A0B6] w-1/4">
                  عدد الساعات
                </TableHead>
                <TableHead className="text-right font-medium text-[#96A0B6] w-1/4">
                  التقدير
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    لا يوجد مواد
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((course, index) => (
                  <TableRow
                    key={index}
                    className={`
                      ${index % 2 !== 0 ? "bg-white" : "bg-gray-100"}
                    `}
                  >
                    <TableCell className="text-right">{course.title}</TableCell>
                    <TableCell className="text-right">{course.code}</TableCell>
                    <TableCell className="text-right">
                      {course.totalHours}
                    </TableCell>
                    <TableCell className="text-right">
                      {course.grade ? course.grade : "مسجل على الفصل الحالي"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Container className="p-0">
        {/* Button to open the dialog */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          disabled={!applicationId || !semester}
        >
          صفحة تسجيل المواد
        </Button>

        {/* Dialog Overlay */}
        <div
          className={`overlay bg-black/50 fixed inset-0 flex items-center justify-center z-50 ${
            isDialogOpen ? "block" : "hidden"
          }`}
        >
          {/* Dialog Content */}
          <div className="dialog-content bg-white p-6 rounded-lg w-full max-w-2xl h-[90%] overflow-y-scroll my-6">
            {/* Dialog Header */}
            <div className="dialog-header flex justify-between items-center mb-4">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Render the logCourses component */}
            {logCourses(applicationId as number, semester as SemesterType)}
          </div>
        </div>
      </Container>
    </Container>
  );
}
