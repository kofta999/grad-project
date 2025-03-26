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
import { useUserContext } from "@/context/UserContext";
import { InferResponseType } from "@repo/mis-api";

type CoursesType = InferResponseType<
  typeof apiClient.student.courses.$get,
  200
>;

interface AcademicYear {
  academicYearId: number;
  year: string;
}

export default function currentCourses() {
  const { loggedInUser } = useUserContext();
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
    semester: string | string[],
    academicYearId: string | string[],
  ) => {
    try {
      const res = await apiClient.student.courses.$get({
        query: {
          semester: semester,
          academicYearId: academicYearId,
        },
      });

      if (res.status == 200) {
        const data = await res.json();
        console.log(data);
        setCourses(data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  };

  const handleSearch = (value: string) => {
    console.log(value);
    const filteredCourses = courses.filter((course: any) =>
      course.title.toLowerCase().includes(value.toLowerCase()),
    );
    setCourses(filteredCourses);
  };

  return (
    <Container>
      <SearchBar placeholder="ابحث هنا..." onChange={handleSearch} />
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
              <p className="text-sm">الاسم / {loggedInUser?.name}</p>
              <p className="text-sm">تاريخ الميلاد / 2000-01-01</p>
              <p className="text-sm">الرقم القومي / 10203040506070</p>
              <p className="text-sm">الدرجة العلمية / ماجستير</p>
              <p className="text-sm">رقم الهاتف / 0123456789</p>
              <p className="text-sm">العام الاكاديمي للتسجيل / 2021-2022</p>
            </CardGrid>
          </div>
          <Select
            className="w-full md:w-1/2"
            onValueChange={(value: string) =>
              getCourses(value, academicYear?.academicYearId)
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
                <TableHead className="text-right font-medium text-[#96A0B6]">
                  اسم المقرر
                </TableHead>
                <TableHead className="text-right font-medium text-[#96A0B6]">
                  كود المقرر
                </TableHead>
                <TableHead className="text-right font-medium text-[#96A0B6]">
                  عدد الساعات
                </TableHead>
                <TableHead className="text-right font-medium text-[#96A0B6]">
                  التقدير
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course, index) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}
