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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type CoursesType = InferResponseType<typeof apiClient.students.me.courses.$get, 200>;

interface AcademicYear {
  academicYearId: number;
  year: string;
}
type SemesterType = "first" | "second" | "third";

export default function Page() {
  const [academicYear, setAcademicYear] = useState<AcademicYear | null>(null);
  const [courses, setCourses] = useState<CoursesType>([]);
  const [loading, setLoading] = useState(false);
  const [semester, setSemester] = useState<SemesterType | "">("");

  const getCurrentAcademicYear = async () => {
    try {
      setLoading(true);
      const res = await apiClient.students.me.courses["registered-academic-years"].$get();
      if (res.status === 200) {
        const data = await res.json();
        setAcademicYear(data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentAcademicYear();
  }, []);

  const getCourses = async (semester: SemesterType, academicYear: AcademicYear | null) => {
    try {
      setLoading(true);
      const res = await apiClient.students.me.courses.$get({
        query: {
          semester: semester,
          academicYearId: academicYear?.academicYearId.toString() || "",
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
    } finally {
      setLoading(false);
    }
  };

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
          <CardTitle>
            <LibraryBig className="w-5 h-5 text-yellow-200" /> المواد الحالية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={semester}
            onValueChange={(value: SemesterType) => {
              setSemester(value);
              getCourses(value, academicYear);
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
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-medium w-1/4">اسم المقرر</TableHead>
                <TableHead className="text-right font-medium w-1/4">كود المقرر</TableHead>
                <TableHead className="text-right font-medium w-1/4">عدد الساعات</TableHead>
                <TableHead className="text-right font-medium w-1/4">التقدير</TableHead>
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
                      ${index % 2 !== 0 ? "bg-white" : "bg-blue-50"}
                    `}
                  >
                    <TableCell className="text-right">{course.title}</TableCell>
                    <TableCell className="text-right">{course.code}</TableCell>
                    <TableCell className="text-right">{course.totalHours}</TableCell>
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
