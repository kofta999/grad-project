"use client";
import React, { useEffect, useState } from "react";
import { LucideClipboardList } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import toast from "react-hot-toast";

type Course = {
  title: string;
  code: string;
  creditHours: number;
  grade?: string;
};

type CoursesType = Course[];

export default function logCourses(applicationId: number | null) {
  const [courses, setCourses] = useState<CoursesType>([]);

  const getAvailableCourses = async (applicationId: number) => {
    try {
      const res = await apiClient.admin.courses.available[":applicationId"].$get({ param: { applicationId: applicationId.toString() } });

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
  }

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
          يجب عليك بتسجيل عدد من المواد بما يعادل 9 من الساعات المعتمده وبحد اقصى 19
        </CardDescription>
        <form>
          {courses.map((course) => (
            <Card key={course.title}>
              <div className="flex items-center justify-between p-3">
                <div>
                  <p>{course.title}</p>
                  <CardDescription>{course.creditHours} ساعة معتمدة</CardDescription>
                </div>
                <div>
                  <Button type="submit" className="bg-mainColor hover:bg-blue-600 text-white ml-3">
                    تسجيل
                  </Button>
                  <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
                    ازالة
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