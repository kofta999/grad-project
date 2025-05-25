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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { LibraryBig } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import useAcademicProgress from "@/hooks/use-acadmic-progress";

type CoursesType = InferResponseType<typeof apiClient.students.me.courses.$get, 200>;

interface AcademicYear {
  academicYearId: number;
  year: string;
}
type SemesterType = "first" | "second" | "third";

type Course = {
  courseId: number;
  code: string;
  title: string;
  prerequisite: number;
  totalHours: number;
  grade: string;
  courseRegistrationId: number;
};

type SemesterCourses = {
  academicYearId: number;
  semester: string;
  courses: Course[];
};

export default function Page() {
  const { currentAcademicYear, incompleteSemester, loading } = useAcademicProgress();

  console.log(currentAcademicYear, incompleteSemester);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-20 h-20" />
      </div>
    );
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LibraryBig className="w-5 h-5 text-yellow-200" /> المواد الحالية
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>المقررات المسجلة في الفصل الدراسي الحالي</CardDescription>

          {!incompleteSemester || incompleteSemester.courses.length === 0 ? (
            <p className="text-center text-xl mt-4">لا يوجد مواد</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-4 mt-6">
                {incompleteSemester?.semester === "first"
                  ? "الترم الأول"
                  : incompleteSemester?.semester === "second"
                    ? "الترم الثاني"
                    : "الترم الصيفي"}
              </h3>

              <Table className="border rounded-md">
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead className="text-right font-medium w-[30%]">اسم المقرر</TableHead>
                    <TableHead className="text-right font-medium w-[25%]">كود المقرر</TableHead>
                    <TableHead className="text-right font-medium w-[25%]">عدد الساعات</TableHead>
                    <TableHead className="text-right font-medium w-[25%]">التقدير</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {incompleteSemester.courses
                    .filter((course) => !course.grade)
                    .map((course, index) => (
                      <TableRow key={index} className={index % 2 !== 0 ? "bg-white" : "bg-blue-50"}>
                        <TableCell className="text-right">{course.title}</TableCell>
                        <TableCell className="text-right">{course.code}</TableCell>
                        <TableCell className="text-right">{course.totalHours}</TableCell>
                        <TableCell className="text-right">
                          {course.grade || "مسجل على الفصل الحالي"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
