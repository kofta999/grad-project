import { Container, ContainerTitle } from "@/components/ui/container";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardGrid, CardTitle } from "@/components/ui/card";
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
import { CalendarIcon, GraduationCap } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormikProps } from "formik";
import { ApplicationStep2Type } from "@/lib/types";
import { InitialFormDataType } from "./application-form";
import { usePathname } from "next/navigation";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";
import CountrySelect from "../ui/CountrySelect";
import { Loader } from "@/components/ui/loader";
import DatePicker from "../ui/date-picker";

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

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <Loader className="w-20 h-20" />
    </div>
  ) : (
    <Container>
      <ContainerTitle>
        {pathname === "/dashboard/applications"
          ? "تابع بيانات التسجيل"
          : "تابع تعديل بيانات التسجيل"}
      </ContainerTitle>
      <form onSubmit={formik.handleSubmit}>
        {/* Qualification Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              <GraduationCap className="h-4 w-4 text-yellow-500" />
              المؤهل المتقدم به
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGrid>
              {/* Country */}
              <SpacingWrapper>
                <CountrySelect
                  name="qualification.countryId"
                  label="الدولة"
                  value={formik.values.qualification.countryId.toString()}
                  error={formik.errors.qualification?.countryId}
                  touched={formik.touched.qualification?.countryId}
                  onChange={(value: string) =>
                    formik.setFieldValue("qualification.countryId", parseInt(value))
                  }
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
                <Input
                  name="qualification.university"
                  value={formik.values.qualification?.university ?? ""}
                  onChange={formik.handleChange}
                />
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
                <Input
                  name="qualification.faculty"
                  value={formik.values.qualification?.faculty ?? ""}
                  onChange={formik.handleChange}
                />
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
                <Input
                  name="qualification.specialization"
                  value={formik.values.qualification?.specialization ?? ""}
                  onChange={formik.handleChange}
                />
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
                <Input
                  name="qualification.qualification"
                  value={formik.values.qualification?.qualification ?? ""}
                  onChange={formik.handleChange}
                />
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
                <Input
                  name="qualification.type"
                  value={formik.values.qualification?.type ?? ""}
                  onChange={formik.handleChange}
                />
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
                <Input
                  name="qualification.year"
                  value={formik.values.qualification?.year ?? ""}
                  onChange={formik.handleChange}
                />
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
                <DatePicker
                  value={
                    formik.values.qualification?.date
                      ? new Date(formik.values.qualification?.date)
                      : undefined
                  }
                  onChange={(date) => formik.setFieldValue("qualification.date", date)}
                  placeholder="اختر تاريخ الحصول عليه"
                />
                {formik.touched.qualification?.date &&
                  typeof formik.errors.qualification?.date === "string" && (
                    <ErrorMessage message={formik.errors.qualification.date} />
                  )}
              </SpacingWrapper>

              {/* Credit Hours */}
              <SpacingWrapper>
                <Label>نوع الدراسة</Label>
                <Select
                  value={formik.values.qualification?.creditHours ? "creditHours" : "classic"}
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
                  value={formik.values.qualification?.grade}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("qualification.grade", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التقدير" />
                  </SelectTrigger>
                  <SelectContent>
                    {formik.values.qualification?.creditHours ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <SelectItem value="a">امتياز</SelectItem>
                        <SelectItem value="b">جيد جدًا</SelectItem>
                        <SelectItem value="c">جيد</SelectItem>
                        <SelectItem value="d">مقبول</SelectItem>
                      </>
                    )}
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
                  value={formik.values.qualification?.gpa}
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
          <CardHeader>
            <CardTitle>
              <GraduationCap className="h-4 w-4 text-yellow-500" />
              الدرجة العلمية المراد التسجيل لها
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                  value={formik.values.registration?.academicYear}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("registration.academicYear", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العام الأكاديمي" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialData?.currentAcademicYears.map(({ academicYearId, year }) => (
                      <SelectItem key={academicYearId} value={academicYearId.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.registration?.academicYear &&
                  formik.errors.registration?.academicYear && (
                    <ErrorMessage message={formik.errors.registration.academicYear} />
                  )}
              </SpacingWrapper>

              {/* Faculty */}
              <SpacingWrapper>
                <Label>الكلية</Label>
                <Select
                  value={formik.values.registration?.faculty}
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
                  value={formik.values.registration?.academicDegree}
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
                    formik.values.registration?.departmentId === 0
                      ? undefined
                      : formik.values.registration?.departmentId.toString()
                  }
                  onValueChange={(value: string) =>
                    formik.setFieldValue("registration.departmentId", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر البرنامج / التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialData?.availableDepartments.map(({ title, departmentId }) => (
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
          <Button
            type="submit"
            disabled={Object.keys(formik.errors).length > 0}
            className="bg-mainColor hover:bg-blue-700 text-white"
          >
            {pathname === "/dashboard/applications" ? "تسجيل" : "تعديل"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
