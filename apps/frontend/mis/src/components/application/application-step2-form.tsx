import { Container, ContainerTitle } from "@/components/ui/container";
import React from "react";
import { Card, CardContent, CardHeader, CardGrid } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormikProps } from "formik";
import { ApplicationStep2Type } from "@/lib/types";
import { InitialFormDataType } from "./application-form";
import { usePathname } from "next/navigation";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";
import CountrySelect from "../ui/CountrySelect";

interface Step2Props {
  goPrevStep: () => void;
  initialData: InitialFormDataType;
  formik: FormikProps<ApplicationStep2Type>;
  loading: boolean;
}

export default function ApplicationStep2Form({
  goPrevStep,
  formik,
  initialData,
  loading,
}: Step2Props) {
  const pathname = usePathname();
  return (
    <Container>
      <ContainerTitle>
        {pathname === "/dashboard/applications"
          ? "تابع بيانات التسجيل"
          : "تابع تعديل بيانات التسجيل"}
      </ContainerTitle>
      <form onSubmit={formik.handleSubmit}>
        {/* Qualification Section */}
        <Card>
          <CardContent>
            <CardHeader>المؤهل المتقدم به</CardHeader>
            <CardGrid>
              {/* Country */}
              <SpacingWrapper>
                <CountrySelect
                  name="qualification.country"
                  label="الدولة"
                  value={formik.values.qualification.country}
                  error={formik.errors.qualification?.country}
                  touched={formik.touched.qualification?.country}
                  onChange={(value: string) => formik.setFieldValue("qualification.country", value)}
                  required={pathname === "/dashboard/applications"}
                />
              </SpacingWrapper>

              {/* University */}
              <SpacingWrapper>
                <Label>
                  الجامعة
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={formik.values.qualification.university}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("qualification.university", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجامعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.university &&
                  formik.errors.qualification?.university && (
                    <ErrorMessage message={formik.errors.qualification.university} />
                  )}
              </SpacingWrapper>

              {/* Faculty */}
              <SpacingWrapper>
                <Label>
                  الكلية
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={formik.values.qualification.faculty}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("qualification.faculty", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الكلية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.faculty && formik.errors.qualification?.faculty && (
                  <ErrorMessage message={formik.errors.qualification.faculty} />
                )}
              </SpacingWrapper>

              {/* Specialization */}
              <SpacingWrapper>
                <Label>
                  التخصص
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={formik.values.qualification.specialization}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("qualification.specialization", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.specialization &&
                  formik.errors.qualification?.specialization && (
                    <ErrorMessage message={formik.errors.qualification.specialization} />
                  )}
              </SpacingWrapper>

              {/* Qualification */}
              <SpacingWrapper>
                <Label>
                  المؤهل
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={formik.values.qualification.qualification}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("qualification.qualification", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المؤهل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.qualification &&
                  formik.errors.qualification?.qualification && (
                    <ErrorMessage message={formik.errors.qualification.qualification} />
                  )}
              </SpacingWrapper>

              {/* Qualification Type */}
              <SpacingWrapper>
                <Label>
                  نوع المؤهل
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={formik.values.qualification.type}
                  onValueChange={(value: any) => formik.setFieldValue("qualification.type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المؤهل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.type && formik.errors.qualification?.type && (
                  <ErrorMessage message={formik.errors.qualification.type} />
                )}
              </SpacingWrapper>

              {/* Year */}
              <SpacingWrapper>
                <Label>
                  سنة المؤهل
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={formik.values.qualification.year}
                  onValueChange={(value: any) => formik.setFieldValue("qualification.year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر سنة المؤهل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.year && formik.errors.qualification?.year && (
                  <ErrorMessage message={formik.errors.qualification.year} />
                )}
              </SpacingWrapper>

              {/* Date */}
              <SpacingWrapper>
                <Label>
                  تاريخ الحصول عليه
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-right font-normal",
                        !formik.values.qualification.date && "text-muted-foreground"
                      )}
                    >
                      {formik.values.qualification.date ? (
                        new Date(formik.values.qualification.date).toLocaleDateString()
                      ) : (
                        <span>اختر التاريخ</span>
                      )}
                      <CalendarIcon className="mr-auto h-4 w-4 text-mainColor" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        formik.values.qualification.date
                          ? new Date(formik.values.qualification.date)
                          : undefined
                      }
                      onSelect={(date) =>
                        formik.setFieldValue(
                          "qualification.date",
                          date ? date.toLocaleDateString("en-US") : ""
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formik.touched.qualification?.date &&
                  typeof formik.errors.qualification?.date === "string" && (
                    <ErrorMessage message={formik.errors.qualification.date} />
                  )}
              </SpacingWrapper>

              {/* Credit Hours */}
              <SpacingWrapper>
                <Label>نوع الدراسة</Label>
                <Select
                  value={formik.values.qualification.creditHours ? "creditHours" : "classic"}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("qualification.creditHours", value === "creditHours")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الدراسة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creditHours">ساعات معتمدة</SelectItem>
                    <SelectItem value="classic">تقليدي</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.creditHours &&
                  formik.errors.qualification?.creditHours && (
                    <ErrorMessage message={formik.errors.qualification.creditHours} />
                  )}
              </SpacingWrapper>

              {/* Grade */}
              <SpacingWrapper>
                <Label>التقدير</Label>
                <Select
                  value={formik.values.qualification.grade}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("qualification.grade", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التقدير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aPlus">A+</SelectItem>
                    <SelectItem value="a">A</SelectItem>
                    <SelectItem value="aMinus">A-</SelectItem>
                    <SelectItem value="bPlus">B+</SelectItem>
                    <SelectItem value="b">B</SelectItem>
                    <SelectItem value="bMinus">B-</SelectItem>
                    <SelectItem value="cPlus">C+</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cMinus">C-</SelectItem>
                    <SelectItem value="d">D</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.grade && formik.errors.qualification?.grade && (
                  <ErrorMessage message={formik.errors.qualification.grade} />
                )}
              </SpacingWrapper>

              {/* GPA */}
              <SpacingWrapper className="md:col-span-2 w-full md:w-1/2 mx-auto">
                <Label>النسبة المئوية / المعدل التراكمي</Label>
                <Input
                  name="qualification.gpa"
                  value={formik.values.qualification.gpa}
                  onChange={(e: any) => {
                    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
                    formik.setFieldValue("qualification.gpa", value);
                  }}
                />
                {formik.touched.qualification?.gpa && formik.errors.qualification?.gpa && (
                  <ErrorMessage message={formik.errors.qualification.gpa} />
                )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Registration Section */}
        <Card>
          <CardContent>
            <CardHeader>المؤهل المتقدم به</CardHeader>
            <CardGrid>
              {/* Academic Year */}
              <SpacingWrapper>
                <Label>
                  العام الأكاديمي للتسجيل
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={
                    formik.values.registration.academicYearId === 0
                      ? undefined
                      : formik.values.registration.academicYearId.toString()
                  }
                  onValueChange={(value: string) =>
                    formik.setFieldValue("registration.academicYearId", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العام الأكاديمي" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialData.currentAcademicYears.map(({ academicYearId, year }) => (
                      <SelectItem key={academicYearId} value={academicYearId.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.registration?.academicYearId &&
                  formik.errors.registration?.academicYearId && (
                    <ErrorMessage message={formik.errors.registration.academicYearId} />
                  )}
              </SpacingWrapper>

              {/* Faculty */}
              <SpacingWrapper>
                <Label>الكلية</Label>
                <Select
                  value={formik.values.registration.faculty}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("registration.faculty", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الكلية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facultyOfEngineering">كلية الهندسة</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.registration?.faculty && formik.errors.registration?.faculty && (
                  <ErrorMessage message={formik.errors.registration.faculty} />
                )}
              </SpacingWrapper>

              {/* Academic Degree */}
              <SpacingWrapper>
                <Label>
                  الدرجات العلمية
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={formik.values.registration.academicDegree}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("registration.academicDegree", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدرجة العلمية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diploma">دبلوم</SelectItem>
                    <SelectItem value="master">ماجيستير</SelectItem>
                    <SelectItem value="phd">دكتوراه</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.registration?.academicDegree &&
                  formik.errors.registration?.academicDegree && (
                    <ErrorMessage message={formik.errors.registration.academicDegree} />
                  )}
              </SpacingWrapper>

              {/* Academic Program */}
              <SpacingWrapper>
                <Label>
                  البرامج / التخصص
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Select
                  value={
                    formik.values.registration.departmentId === 0
                      ? undefined
                      : formik.values.registration.departmentId.toString()
                  }
                  onValueChange={(value: string) =>
                    formik.setFieldValue("registration.departmentId", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر البرنامج / التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialData.availableDepartments.map(({ title, departmentId }) => (
                      <SelectItem key={departmentId} value={departmentId.toString()}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.registration?.departmentId &&
                  formik.errors.registration?.departmentId && (
                    <ErrorMessage message={formik.errors.registration.departmentId} />
                  )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-center gap-16">
          <Button variant="outline" className="border-[#BABABA]" onClick={goPrevStep}>
            السابق
          </Button>
          <Button type="submit" className="bg-mainColor hover:bg-blue-700 text-white">
            التسجيل
          </Button>
        </div>
      </form>
    </Container>
  );
}
