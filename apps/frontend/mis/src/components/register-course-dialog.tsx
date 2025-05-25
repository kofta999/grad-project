import React, { useEffect, useState } from "react";
import { LucideClipboardList } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardGrid,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import toast from "react-hot-toast";
import { InferResponseType } from "@repo/mis-api";
import { SpacingWrapper } from "./ui/spacing-wrapper";

type AvailableCourse = InferResponseType<
  (typeof apiClient.applications)[":id"]["available-courses"]["$get"],
  200
>[number];

type RegisteredCourse = InferResponseType<
  (typeof apiClient.applications)[":id"]["courses"]["$get"],
  200
>[number];

type SemesterType = "first" | "second" | "third";

type RegisterCourseDialogProps = {
  applicationId: number;
  semester: SemesterType;
  userRegisteredCourses: RegisteredCourse[];
  setUserRegisteredCourses: React.Dispatch<React.SetStateAction<RegisteredCourse[]>>;
};

export default function RegisterCourseDialog({
  applicationId,
  semester,
  userRegisteredCourses,
  setUserRegisteredCourses,
}: RegisterCourseDialogProps) {
  const [availableCourses, setAvailableCourses] = useState<AvailableCourse[]>([]);

  const getAvailableCourses = async (applicationId: number) => {
    try {
      const res = await apiClient.applications[":id"]["available-courses"].$get({
        param: { id: applicationId.toString() },
      });

      if (res.status === 200) {
        const data = await res.json();

        // Filter out courses that are already registered
        // const registeredCourseIds = userRegisteredCourses
        //   .filter((course) => course.grade != "F")
        //   .map((course) => course.courseId);

        // const filteredCourses = data.filter(
        //   (course) => !registeredCourseIds.includes(course.courseId)
        // );

        setAvailableCourses(data);
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
        toast.error("تجاوزت عدد الساعات المسموح بها");
        return;
      }

      const res = await apiClient.enrollments.$post({
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
        await getAvailableCourses(applicationId);

        toast.success("تم تسجيل المادة بنجاح");
      } else {
        const error = await res.json();
        toast.error(error.error);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل المادة");
    }
  };

  const removeCourse = async (course: AvailableCourse) => {
    try {
      if (!course.courseRegistrationId) {
        toast.error("لا يوجد معرف تسجيل للمادة");
        return;
      }

      const res = await apiClient.enrollments[":id"].$delete({
        param: { id: course.courseRegistrationId.toString() },
      });

      if (res.status === 204) {
        setUserRegisteredCourses((prev) =>
          prev.filter((rc) => rc.courseRegistrationId !== course.courseRegistrationId)
        );

        await getAvailableCourses(applicationId);

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
      <CardHeader>
        <CardTitle>
          <LucideClipboardList className="text-yellow-500" />
          تسجيل المواد الدراسيه
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <CardDescription>
          يجب عليك بتسجيل عدد من المواد بما يعادل 9 من الساعات المعتمده وبحد اقصى 19
        </CardDescription>
        <CardGrid className="md:grid-cols-1">
          {availableCourses.map((course) => {
            const isRegistered = userRegisteredCourses.some(
              (rc) => rc.courseId === course.courseId
            );

            return (
              <SpacingWrapper key={course.courseId}>
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
              </SpacingWrapper>
            );
          })}
        </CardGrid>
      </CardContent>
    </Card>
  );
}
