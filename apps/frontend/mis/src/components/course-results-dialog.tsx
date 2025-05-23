import React, { useEffect, useState } from "react";
import { RegisteredCourse, SemesterType } from "@/app/dashboard/@admin/course-registrations/page";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardGrid, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog } from "lucide-react";
import { SpacingWrapper } from "./ui/spacing-wrapper";
import { apiClient } from "@/lib/client";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { InferResponseType } from "@repo/mis-api";
import { Loader } from "@/components/ui/loader";

type courseResult = InferResponseType<(typeof apiClient)["course-results"]["$get"], 200>;

export default function CourseResultsDialog({
  selectedCourse,
  getCourses,
  applicationId,
  semester,
  academicYear,
}: {
  selectedCourse: RegisteredCourse | null;
  getCourses: (
    applicationId: number,
    semester: SemesterType,
    academicYearId: number
  ) => Promise<void>;
  applicationId: number | null;
  semester: SemesterType | null;
  academicYear: number | null;
}) {
  const [response, setResponse] = useState<courseResult | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const getGradeNumber = async (selectedCourse: RegisteredCourse) => {
    try {
      setLoading(true);
      const res = await apiClient["course-results"].$get({
        // Here the course _should_ be registered, or this function would not be invoked in first place, right?
        query: { courseRegistrationId: selectedCourse.courseRegistrationId!.toString() },
      });

      if (res.status === 200) {
        const data = await res.json();

        if (data[0].grade === null) {
          setLoading(false);
          setResult(null);
        } else {
          setLoading(false);
          setResponse(data);
          setResult(data[0].grade);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const addGrade = async (result: number) => {
    try {
      if (result === null || result < 0 || result > 100) {
        toast.error("الدرجة يجب أن تكون بين 0 و 100");
        return;
      }
      setLoading(true);
      const res = await apiClient["course-results"].$post({
        json: {
          courseRegistrationId: selectedCourse?.courseRegistrationId!,
          grade: result,
        },
      });

      if (res.status === 200) {
        setLoading(false);
        toast.success("تم إضافة التقدير");
        await getCourses(applicationId!, semester!, academicYear!);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("فشل إضافة التقدير");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const updateGrade = async () => {
    try {
      if (result === null || result < 0 || result > 100) {
        toast.error("الدرجة يجب أن تكون بين 0 و 100");
        return;
      }

      if (result === 0) {
        // because if the user types 0 the course will be still registered with grade 0
        await removeGrade();
        return;
      }
      setLoading(true);
      const res = await apiClient["course-results"].$put({
        json: {
          resultId: response![0].courseResultId!,
          grade: result,
        },
      });

      if (res.status === 200) {
        setLoading(false);
        toast.success("تم تحديث التقدير");
        await getCourses(applicationId!, semester!, academicYear!);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("فشل تحديث التقدير");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const removeGrade = async () => {
    try {
      setLoading(true);
      const res = await apiClient["course-results"][":id"].$delete({
        param: {
          id: response![0].courseResultId!.toString(),
        },
      });

      if (res.status === 200) {
        setLoading(false);
        toast.success("تم إزالة التقدير");
        setResult(null);
        await getCourses(applicationId!, semester!, academicYear!);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("فشل إزالة التقدير");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      getGradeNumber(selectedCourse);
    }
  }, [selectedCourse]);

  return (
    <>
      <Card>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Loader className="w-20 h-20" />
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle>
                <Cog className="w-5 h-5 text-yellow-200" />
                تعديل تقدير الطالب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardGrid className="md:grid-cols-1">
                <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <Label>التقدير الحالي</Label>
                  <Input
                    min={0}
                    max={100}
                    value={result?.toString() || ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 100) {
                        setResult(value);
                      }
                    }}
                  />
                  <p className="text-gray-400 py-2 text-sm">
                    يرجي كتابة التقدير الجديد واضغط إضافة
                  </p>
                  {!response ? (
                    <Button
                      className="w-full md:w-[100px] bg-mainColor hover:bg-blue-700"
                      onClick={() => addGrade(result!)}
                    >
                      إضافة
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="w-full md:w-[100px] bg-green-600 hover:bg-green-700"
                        onClick={() => updateGrade()}
                      >
                        تعديل
                      </Button>
                      <Button
                        className="w-full md:w-[100px] bg-red-600 hover:bg-red-700 md:mr-4"
                        onClick={() => removeGrade()}
                      >
                        إزالة
                      </Button>
                    </>
                  )}
                </SpacingWrapper>
              </CardGrid>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
