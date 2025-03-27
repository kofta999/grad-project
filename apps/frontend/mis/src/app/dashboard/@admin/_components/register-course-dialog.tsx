"use client";
import React, { useEffect, useState } from "react";
import { LucideClipboardList } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import toast from "react-hot-toast";
import { InferResponseType } from "@repo/mis-api";

type Course = InferResponseType<
  (typeof apiClient.admin.courses.available)[":applicationId"]["$get"],
  200
>[number];

type CoursesType = Course[];
type SemesterType = "first" | "second" | "third";

export default function RegisterCourseDialog({
  applicationId,
  semester,
}: {
  applicationId: number;
  semester: SemesterType;
}) {
  const [courses, setCourses] = useState<CoursesType>([]);
  const [buttonStatus, setButtonStatus] = useState(true);

  const getAvailableCourses = async (applicationId: number) => {
    try {
      const res = await apiClient.admin.courses.available[
        ":applicationId"
      ].$get({ param: { applicationId: applicationId.toString() } });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setCourses(data);
      } else {
        toast.error("فشل العثور علي المواد");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerCourse = async (
    e: React.FormEvent,
    course: Course,
    semester: SemesterType,
    applicationId: number,
  ) => {
    e.preventDefault();
    const { courseId } = course;
    console.log(applicationId, courseId, semester);
    try {
      const res = await apiClient.admin.courses.register.$post({
        json: {
          applicationId,
          courseId,
          semester,
        },
      });

      if (res.status === 201) {
        const data = await res.json();
        console.log(data);
        toast.success("تم تسجيل المادة بنجاح");
        setButtonStatus(false);
      } else {
        toast.error("فشل تسجيل المادة");
        setButtonStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCourse = async (e: React.FormEvent, course: Course) => {
    e.preventDefault();
    const { courseId } = course;
    try {
      const res = await apiClient.admin.courses[":id"].$delete({
        param: { id: courseId.toString() },
      });

      if (res.status === 204) {
        toast.success("تم حذف المادة بنجاح");
        setButtonStatus(true);
      } else {
        toast.error("فشل حذف المادة");
        setButtonStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (applicationId) {
      getAvailableCourses(applicationId);
    }
  }, [applicationId]);

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <LucideClipboardList className="text-mainColor mb-4" />
        <CardHeader>تسجيل المواد الدراسيه</CardHeader>
        <CardDescription>
          يجب عليك بتسجيل عدد من المواد بما يعادل 9 من الساعات المعتمده وبحد
          اقصى 19
        </CardDescription>
        <form>
          {courses.map((course) => (
            <Card key={course.title}>
              <div className="flex items-center justify-between p-3">
                <div>
                  <p>{course.title}</p>
                  <CardDescription>
                    {course.totalHours} ساعة معتمدة
                  </CardDescription>
                </div>
                <div>
                  <Button
                    onClick={
                      buttonStatus
                        ? (e) =>
                            registerCourse(e, course, semester, applicationId)
                        : (e) => removeCourse(e, course)
                    }
                    type="submit"
                    className={
                      buttonStatus
                        ? "bg-mainColor hover:bg-blue-600 text-white ml-3"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }
                  >
                    {buttonStatus ? "تسجيل" : "ازالة"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </form>
      </CardContent>
    </Card>
  );
}
