"use client";
import React, { useState } from "react";
import { LucideClipboardList } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function logCourses() {
  const [courses, setCourses] = useState([
    { title: "تحليل عددي", creditHours: 3 },
    { title: "رياضيات هندسية", creditHours: 4 },
    { title: "فيزياء عامة", creditHours: 3 },
    { title: "كيمياء عامة", creditHours: 2 },
    { title: "أحياء عامة", creditHours: 0 },
    { title: "برمجة متقدمة", creditHours: 3 },
    { title: "قواعد بيانات", creditHours: 3 },
    { title: "هندسة البرمجيات", creditHours: 3 },
    { title: "ذكاء اصطناعي", creditHours: 1 },
    { title: "تعلم الآلة", creditHours: 3 },
  ]);

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
              <div className="flex items-center gap-4 p-3">
                <Checkbox />
                <div>
                  <p>{course.title}</p>
                  <CardDescription>{course.creditHours} ساعة معتمدة</CardDescription>
                </div>
              </div>
            </Card>
          ))}
          <Button type="submit" className="w-full bg-mainColor hover:bg-blue-600 text-white">
            تسجيل
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}