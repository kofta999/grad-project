"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components/ui/loader";
import { Calendar } from "lucide-react";
import useAcadmicProgress from "@/hooks/use-acadmic-progress";

export default function Page() {
  const [semester] = useState(["first", "second", "third"]);
  const { academicYears, semesterCourses, loading } = useAcadmicProgress();

  if (academicYears.length === 0 && semesterCourses.length > 0) {
    return (
      <Container className="h-screen flex items-center justify-center">
        <p className="text-3xl font-bold text-mainColor">لا يوجد نتائج</p>
      </Container>
    );
  }

  return (
    <Container>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="w-20 h-20" />
        </div>
      ) : (
        academicYears.map((academicYear) => (
          <Card key={academicYear.academicYearId} className="mb-6">
            <CardHeader>
              <CardTitle>
                <Calendar className="w-5 h-5 text-yellow-200" />
                العام الاكاديمي : {academicYear.year}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {semester.map((sem) => {
                const semesterData = semesterCourses.find(
                  (sc) => sc.academicYearId === academicYear.academicYearId && sc.semester === sem
                );

                if (!semesterData || semesterData.courses.length === 0) return null;

                const allCoursesHaveGrades = semesterData.courses.every((course) => course.grade);

                if (!allCoursesHaveGrades) return null;

                return (
                  <div key={sem} className="mb-6">
                    {sem === "first" ? (
                      <h3 className="text-lg font-semibold mb-4">الترم الاول</h3>
                    ) : sem === "second" ? (
                      <h3 className="text-lg font-semibold mb-4">الترم الثاني</h3>
                    ) : (
                      <h3 className="text-lg font-semibold mb-4">الترم الصيفي</h3>
                    )}
                    <Table className="border rounded-md">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right font-medium w-1/4">اسم المقرر</TableHead>
                          <TableHead className="text-right font-medium w-1/4">كود المقرر</TableHead>
                          <TableHead className="text-right font-medium w-1/4">
                            عدد الساعات
                          </TableHead>
                          <TableHead className="text-right font-medium w-1/4">التقدير</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {semesterData.courses.map((course, index) => (
                          <TableRow
                            key={index}
                            className={index % 2 !== 0 ? "bg-white" : "bg-blue-50"}
                          >
                            <TableCell className="text-right">{course.title}</TableCell>
                            <TableCell className="text-right">{course.code}</TableCell>
                            <TableCell className="text-right">{course.totalHours}</TableCell>
                            <TableCell className="text-right">{course.grade}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}
