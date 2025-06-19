"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Loader } from "@/components/ui/loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAcademicProgress from "@/hooks/use-academic-progress";
import { LibraryBig } from "lucide-react";

export default function Page() {
  const { incompleteSemester, loading } = useAcademicProgress();

  if (!loading && (!incompleteSemester || incompleteSemester?.courses.length === 0)) {
    return (
      <Container className="h-screen flex items-center justify-center">
        <p className="text-3xl font-bold text-mainColor">لا يوجد مواد</p>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LibraryBig className="w-5 h-5 text-yellow-200" /> المواد الحالية
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription>المقررات المسجلة في الفصل الدراسي الحالي</CardDescription>

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
                {incompleteSemester?.courses
                  .filter((course) => !course.grade)
                  .map((course, index) => (
                    <TableRow
                      key={course.courseId}
                      className={index % 2 !== 0 ? "bg-white" : "bg-blue-50"}
                    >
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
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
