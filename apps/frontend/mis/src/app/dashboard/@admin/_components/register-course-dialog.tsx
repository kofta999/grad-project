"use client";
import React, { useEffect, useState } from "react";
import { LucideClipboardList } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import toast from "react-hot-toast";
import { InferResponseType } from "@repo/mis-api";

type AvailableCourse = InferResponseType<
  (typeof apiClient.admin.courses.available)[":applicationId"]["$get"],
  200
>[number];

type RegisteredCourse = InferResponseType<typeof apiClient.admin.courses.list.$post, 200>[number];

type SemesterType = "first" | "second" | "third";

export default function RegisterCourseDialog({
  applicationId,
  semester,
  userRegisteredCourses,
  setUserRegisteredCourses,
}: {
  applicationId: number;
  semester: SemesterType;
  userRegisteredCourses: RegisteredCourse[];
  setUserRegisteredCourses: (courses: RegisteredCourse[]) => void;
}) {
  const [availableCourses, setAvailableCourses] = useState<AvailableCourse[]>([]);

  const getAvailableCourses = async (applicationId: number) => {
    try {
      const res = await apiClient.admin.courses.available[":applicationId"].$get({
        param: { applicationId: applicationId.toString() },
      });

      if (res.status === 200) {
        const data = await res.json();

        // Filter out courses that are already registered
        const registeredCourseIds = userRegisteredCourses
          .filter((course) => course?.grade >= 60)
          .map((course) => course.courseId);

        const filteredCourses = data.filter(
          (course) => !registeredCourseIds.includes(course.courseId)
        );

        setAvailableCourses(filteredCourses);
      } else {
        toast.error("فشل العثور علي المواد");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب المواد المتاحة");
    }
  };

  const registerCourse = async (course: AvailableCourse) => {
    try {
      const hoursArray = userRegisteredCourses.map((course) => course.totalHours);
      const totalHours = hoursArray.reduce((a, b) => a + b, 0);

      if (totalHours >= 16) {
        toast.error("تجاوز عدد الساعات المسموح بها");
        return;
      }

      const res = await apiClient.admin.courses.register.$post({
        json: {
          applicationId,
          courseId: course.courseId,
          semester,
        },
      });

      if (res.status === 201) {
        const data = await res.json();

        const registeredCourse = {
          ...course,
          courseRegistrationId: data.courseRegistrationId,
          grade: null,
        };

        setUserRegisteredCourses((prev) => [...prev, registeredCourse]);

        toast.success("تم تسجيل المادة بنجاح");
      } else {
        toast.error("فشل تسجيل المادة");
      }
    } catch (error) {
      console.log("Registration error:", error);
      toast.error("حدث خطأ أثناء تسجيل المادة");
    }
  };

  const removeCourse = async (course: AvailableCourse) => {
    try {
      if (!course.courseRegistrationId) {
        toast.error("لا يوجد معرف تسجيل للمادة");
        return;
      }

      const res = await apiClient.admin.courses[":id"].$delete({
        param: { id: course.courseRegistrationId.toString() },
      });

      if (res.status === 204) {
        setUserRegisteredCourses((prev) =>
          prev.filter((rc) => rc.courseRegistrationId !== course.courseRegistrationId)
        );

        setAvailableCourses((prev) => [...prev, { ...course, courseRegistrationId: undefined }]);

        //await getAvailableCourses(applicationId);

        toast.success("تم حذف المادة بنجاح");
      } else {
        const data = await res.json();

        if (data.error === "This course is already passed, mustn't be deleted") {
          toast.error("لا يمكن حذف المادة المكتملة");
        } else {
          toast.error("فشل حذف المادة");
        }
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء حذف المادة");
    }
  };

  const handleCourseAction = async (e: React.FormEvent, course: AvailableCourse) => {
    e.preventDefault();
    const isRegistered = userRegisteredCourses.some((rc) => rc.courseId === course.courseId);

    console.log(userRegisteredCourses);

    if (isRegistered) {
      removeCourse(course);
    } else {
      registerCourse(course);
    }
  };

  useEffect(() => {
    if (applicationId) {
      getAvailableCourses(applicationId);
    }
  }, [applicationId]);

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-3 md:p-6">
        <LucideClipboardList className="text-mainColor mb-4" />
        <CardHeader>تسجيل المواد الدراسيه</CardHeader>
        <CardDescription>
          يجب عليك بتسجيل عدد من المواد بما يعادل 9 من الساعات المعتمده وبحد اقصى 19
        </CardDescription>
        <div>
          {availableCourses.map((course) => {
            const isRegistered = userRegisteredCourses.some(
              (rc) => rc.courseId === course.courseId
            );

            return (
              <Card key={course.courseId} className="mt-3 md:p-6">
                <div className="flex justify-between flex-col md:flex-row p-3 mx-3 md:mx-0">
                  <div>
                    <p>{course.title}</p>
                    <CardDescription className="my-3 md:m-0">
                      {course.totalHours} ساعة معتمدة
                    </CardDescription>
                  </div>
                  <div>
                    <Button
                      onClick={(e) => handleCourseAction(e, course)}
                      type="submit"
                      className={
                        isRegistered
                          ? "bg-red-500 hover:bg-red-600 text-white w-[100px]"
                          : "bg-mainColor hover:bg-blue-600 text-white w-[100px]"
                      }
                    >
                      {isRegistered ? "ازالة" : "تسجيل"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
