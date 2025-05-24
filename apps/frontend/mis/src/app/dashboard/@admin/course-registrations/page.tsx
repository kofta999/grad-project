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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { LibraryBig, X } from "lucide-react";
import RegisterCourseDialog from "@/components/register-course-dialog";
import { InferResponseType } from "@repo/mis-api";
import { StudentType, ApplicationType } from "@/lib/types";
import CourseResultsDialog from "@/components/course-results-dialog";
import { Loader } from "@/components/ui/loader";
import { SpacingWrapper } from "@/components/ui/spacing-wrapper";

export type RegisteredCourse = InferResponseType<
  (typeof apiClient.applications)[":id"]["courses"]["$get"],
  200
>[number];
type CoursesType = RegisteredCourse[];

export type SemesterType = "first" | "second" | "third" | "";

export default function Page({
  searchParams,
}: {
  searchParams: { applicationId: string | undefined };
}) {
  const [student, setStudent] = useState<StudentType | null>(null);
  const [application, setApplication] = useState<ApplicationType | null>(null);

  const [applicationId, setApplicationId] = useState<number | null>(
    searchParams.applicationId ? parseInt(searchParams.applicationId) : null
  );
  const [academicYear, setAcademicYear] = useState<number | null>(null);
  const [semester, setSemester] = useState<SemesterType | null>("");

  const [courses, setCourses] = useState<CoursesType>([]);

  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<RegisteredCourse | null>(null);

  const [loading, setLoading] = useState(false);

  const getUser = async (id: number | null) => {
    // Check if id is null or invalid
    if (id === null || id === 0) {
      // Reset states if the search input is cleared
      setStudent(null);
      setApplication(null);
      setAcademicYear(null);
      return;
    }

    try {
      setLoading(true);
      const applicationRes = await apiClient.applications[":id"].$get({
        param: { id: id.toString() },
      });

      if (!applicationRes.ok) {
        throw new Error("التقديم غير موجود");
      }

      const application = await applicationRes.json();

      const studentRes = await apiClient.students[":id"].$get({
        param: { id: application.studentId.toString() },
      });

      if (!studentRes.ok) {
        throw new Error("الطالب غير موجود");
      }

      const student = await studentRes.json();

      if (studentRes.status === 200) {
        setLoading(false);
        // Data WILL be there
        setStudent(student);
        setApplication(application);
        setAcademicYear(application.registration.academicYearId);
      } else {
        setLoading(false);
        toast.error("مستخدم غير موجود");

        setStudent(null);
        setApplication(null);
        setAcademicYear(null);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching application:", error);
      toast.error("فشل العثور علي المستخدم");
    }
  };

  const getCourses = async (
    applicationId: number,
    semester: SemesterType,
    academicYearId: number
  ) => {
    if (!applicationId || !semester || !academicYearId) {
      setCourses([]);
      return;
    }
    try {
      setLoading(true);

      const res = await apiClient.applications[":id"]["courses"].$get({
        param: { id: applicationId.toString() },
        query: {
          semester: semester,
          academicYearId: academicYearId.toString(),
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setLoading(false);
        setCourses(data);
      } else {
        setLoading(false);

        toast.error("فشل العثور علي المواد");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching courses:", error);
      toast.error("فشل العثور علي المواد");
    }
  };

  const handleSearch = (applicationId: string) => {
    const id = applicationId ? Number(applicationId) : null;
    setApplicationId(id);
  };

  useEffect(() => {
    getUser(applicationId);
  }, [applicationId]);

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 100);
    if (applicationId && semester && academicYear) {
      getCourses(applicationId, semester, academicYear);
    } else {
      setCourses([]);
    }
  }, [applicationId, semester, academicYear]);

  return (
    <Container>
      <Card>
        <SearchBar placeholder="ابحث هنا..." onChange={(value) => handleSearch(value as string)} />
      </Card>

      {loading ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <Loader className="w-20 h-20" />
          </div>
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>
                <LibraryBig className="w-5 h-5 text-yellow-200" /> بيانات الطالب ومواده
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-[120px] h-[120px] mb-4 border-2 border-mainColor rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={student?.imageUrl || "/avatar.jpg"}
                  alt="user-image"
                  width={120}
                  height={120}
                />
              </div>
              <CardGrid className="my-4">
                <SpacingWrapper>
                  <p className="text-gray-600">الاسم / {student?.fullNameAr}</p>
                </SpacingWrapper>
                <SpacingWrapper>
                  <p className="text-gray-600">تاريخ الميلاد / {student?.dob}</p>
                </SpacingWrapper>
                <SpacingWrapper>
                  <p className="text-gray-600">الرقم القومي / {student?.idNumber}</p>
                </SpacingWrapper>
                <SpacingWrapper>
                  <p className="text-gray-600">
                    الدرجة العلمية / {application?.registration?.academicDegree}
                  </p>
                </SpacingWrapper>
                <SpacingWrapper>
                  <p className="text-gray-600">رقم الهاتف / {student?.phoneNoMain}</p>
                </SpacingWrapper>
                <SpacingWrapper>
                  <p className="text-gray-600">
                    العام الاكاديمي للتسجيل / {application?.registration.academicYear}
                  </p>
                </SpacingWrapper>
              </CardGrid>
              <Select
                value={semester as string}
                onValueChange={(value: "first" | "second" | "third") => {
                  setSemester(value);
                }}
              >
                <SelectTrigger className="w-full md:w-[49%]">
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
                    <TableHead className="text-right font-medium w-[25%]">اسم المقرر</TableHead>
                    <TableHead className="text-right font-medium w-[20%]">كود المقرر</TableHead>
                    <TableHead className="text-right font-medium w-[20%]">عدد الساعات</TableHead>
                    <TableHead className="text-right font-medium w-[20%]">التقدير</TableHead>
                    <TableHead className="text-right font-medium w-[20%]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-xl">
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
                          {course.grade ? course.grade : "لا يوجد تقدير"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => {
                              setIsResultsDialogOpen(true);
                              setIsRegisterDialogOpen(false);
                              setSelectedCourse(course);
                            }}
                            className={`w-full md:w-auto ${
                              course.grade
                                ? "bg-mainColor hover:bg-blue-700"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            {course.grade ? "تعديل تقدير" : "إضافة تقدير"}
                          </Button>
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
              onClick={() => {
                setIsRegisterDialogOpen(true);
                setIsResultsDialogOpen(false);
              }}
              disabled={!applicationId || !semester}
            >
              صفحة تسجيل المواد
            </Button>

            {/* Dialog Overlay */}
            <div
              className={`overlay bg-black/55 fixed inset-0 flex items-center justify-center z-50 ${
                isRegisterDialogOpen || isResultsDialogOpen ? "block" : "hidden"
              }`}
            >
              {/* Dialog Content */}
              <div className="dialog-content bg-white p-3 md:p-6 rounded-lg w-full max-w-2xl h-[90%] overflow-y-scroll m-6 md:m-0">
                {/* Dialog Header */}
                <div className="dialog-header flex justify-between items-center mb-4">
                  <button
                    onClick={() => {
                      setIsRegisterDialogOpen(false);
                      setIsResultsDialogOpen(false);
                    }}
                    className="absolute top-3 right-5 lg:right-10 text-white"
                  >
                    <X className="h-8 w-8" />
                  </button>
                </div>

                {isResultsDialogOpen ? (
                  <CourseResultsDialog
                    selectedCourse={selectedCourse}
                    getCourses={() => getCourses(applicationId!, semester!, academicYear!)}
                    applicationId={applicationId}
                    semester={semester}
                    academicYear={academicYear}
                  />
                ) : null}

                {isRegisterDialogOpen && applicationId && semester ? (
                  <RegisterCourseDialog
                    applicationId={applicationId}
                    semester={semester}
                    userRegisteredCourses={courses}
                    setUserRegisteredCourses={setCourses}
                  />
                ) : null}
              </div>
            </div>
          </Container>
        </>
      )}
    </Container>
  );
}
