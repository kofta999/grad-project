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
import { Card } from "@/components/ui/card";
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
import { InferResponseType } from "@repo/mis-api";
import toast from "react-hot-toast";

type CoursesType = InferResponseType<
  typeof apiClient.student.courses.$get,
  200
>;

interface AcademicYear {
  academicYearId: number;
  year: string;
}
type SemesterType = "first" | "second" | "third";

export default function currentCourses() {
  const [academicYear, setAcademicYear] = useState<AcademicYear | null>(null);
  const [courses, setCourses] = useState<CoursesType>([]);

  const getCurrentAcademicYear = async () => {
    const res = await apiClient.student.courses.registeredAcademicYears.$get();
    if (res.status === 200) {
      const data = await res.json();
      setAcademicYear(data[0]);
    }
  };

  useEffect(() => {
    getCurrentAcademicYear();
  }, []);

  const getCourses = async (
    semester: SemesterType,
    academicYear: AcademicYear | null,
  ) => {
    try {
      const res = await apiClient.student.courses.$get({
        query: {
          semester: semester,
          academicYearId: academicYear?.academicYearId.toString() || '',
        },
      });

      if (res.status == 200) {
        const data = await res.json();
        if (data.length === 0) {
          toast.error("لا يوجد مواد");
        } else {
          toast.success("تم العثور علي المواد");
        }
        setCourses(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("فشل العثور علي المواد");
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Select
            className="w-full md:w-1/2"
            onValueChange={(value: SemesterType) =>
              getCourses(value, academicYear)
            }
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
    </Container>
  );
}
