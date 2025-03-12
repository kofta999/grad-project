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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormStep2Type, InitialFormDataType } from "../page";
import { FormikProps } from "formik";

interface Step2Props {
  goPrevStep: () => void;
  initialData: InitialFormDataType;
  formik: FormikProps<FormStep2Type>;
}

export default function Step2({ goPrevStep, formik, initialData }: Step2Props) {
  return (
    <Container>
      <ContainerTitle>تابع بيانات التسجيل</ContainerTitle>
      <form onSubmit={formik.handleSubmit}>
        {/* Qualification Section */}
        <Card>
          <CardContent>
            <CardHeader>المؤهل المتقدم به</CardHeader>
            <CardGrid>
              {/* Country */}
              <div className="space-y-2">
                <Label>الدولة</Label>
                <Select
                  value={formik.values.qualification.country}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("qualification.country", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.qualification?.country &&
                  formik.errors.qualification?.country && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.country}
                    </p>
                  )}
              </div>

              {/* University */}
              <div className="space-y-2">
                <Label>
                  الجامعة<span className="text-red-500">*</span>
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
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.university}
                    </p>
                  )}
              </div>

              {/* Faculty */}
              <div className="space-y-2">
                <Label>
                  الكلية<span className="text-red-500">*</span>
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
                {formik.touched.qualification?.faculty &&
                  formik.errors.qualification?.faculty && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.faculty}
                    </p>
                  )}
              </div>

              {/* Qualification Type */}
              <div className="space-y-2">
                <Label>
                  نوع المؤهل<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.qualification.type}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("qualification.type", value)
                  }
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
                {formik.touched.qualification?.type &&
                  formik.errors.qualification?.type && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.type}
                    </p>
                  )}
              </div>

              {/* Qualification */}
              <div className="space-y-2">
                <Label>
                  المؤهل<span className="text-red-500">*</span>
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
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.qualification}
                    </p>
                  )}
              </div>

              {/* Specialization */}
              <div className="space-y-2">
                <Label>
                  التخصص<span className="text-red-500">*</span>
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
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.specialization}
                    </p>
                  )}
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label>
                  سنة المؤهل<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.qualification.year}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("qualification.year", value)
                  }
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
                {formik.touched.qualification?.year &&
                  formik.errors.qualification?.year && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.year}
                    </p>
                  )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>
                  تاريخ الحصول عليه<span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-right font-normal",
                        !formik.values.qualification.date &&
                          "text-muted-foreground",
                      )}
                    >
                      {formik.values.qualification.date ? (
                        new Date(
                          formik.values.qualification.date,
                        ).toLocaleDateString()
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
                          date ? date.toLocaleDateString("en-US") : "",
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formik.touched.qualification?.date &&
                  typeof formik.errors.qualification?.date === "string" && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification?.date}
                    </p>
                  )}
              </div>

              {/* Credit Hours */}
              <div className="space-y-2">
                <Label>نوع الدراسة</Label>
                <Select
                  value={
                    formik.values.qualification.creditHours
                      ? "creditHours"
                      : "classic"
                  }
                  onValueChange={(value: string) =>
                    formik.setFieldValue(
                      "qualification.creditHours",
                      value === "creditHours",
                    )
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
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.creditHours}
                    </p>
                  )}
              </div>

              {/* Grade */}
              <div className="space-y-2">
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
                {formik.touched.qualification?.grade &&
                  formik.errors.qualification?.grade && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.grade}
                    </p>
                  )}
              </div>

              {/* GPA */}
              <div className="space-y-2 col-span-2 justify-self-center md:w-full md:max-w-[calc(100%/2)]">
                <Label>النسبة المئوية / المعدل التراكمي</Label>
                <Input
                  name="qualification.gpa"
                  value={formik.values.qualification.gpa}
                  onChange={formik.handleChange}
                />
                {formik.touched.qualification?.gpa &&
                  formik.errors.qualification?.gpa && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.qualification.gpa}
                    </p>
                  )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Registration Section */}
        <Card>
          <CardContent>
            <CardHeader>المؤهل المتقدم به</CardHeader>
            <CardGrid>
              {/* Academic Year */}
              <div className="space-y-2">
                <Label>
                  العام الأكاديمي للتسجيل<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={
                    formik.values.registration.academicYearId === 0
                      ? undefined
                      : formik.values.registration.academicYearId.toString()
                  }
                  onValueChange={(value: string) =>
                    formik.setFieldValue(
                      "registration.academicYearId",
                      parseInt(value),
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العام الأكاديمي" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialData.currentAcademicYears.map(
                      ({ academicYearId, year }) => (
                        <SelectItem
                          key={academicYearId}
                          value={academicYearId.toString()}
                        >
                          {year}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                {formik.touched.registration?.academicYearId &&
                  formik.errors.registration?.academicYearId && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.registration.academicYearId}
                    </p>
                  )}
              </div>

              {/* Faculty */}
              <div className="space-y-2">
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
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.registration?.faculty &&
                  formik.errors.registration?.faculty && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.registration.faculty}
                    </p>
                  )}
              </div>

              {/* Academic Degree */}
              <div className="space-y-2">
                <Label>
                  الدرجات العلمية<span className="text-red-500">*</span>
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
                    <p className="text-red-500 text-sm">
                      {formik.errors.registration.academicDegree}
                    </p>
                  )}
              </div>

              {/* Academic Program */}
              <div className="space-y-2">
                <Label>
                  البرامج / التخصص<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={
                    formik.values.registration.departmentId === 0
                      ? undefined
                      : formik.values.registration.departmentId.toString()
                  }
                  onValueChange={(value: string) =>
                    formik.setFieldValue(
                      "registration.departmentId",
                      parseInt(value),
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر البرنامج / التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialData.availableDepartments.map(
                      ({ title, departmentId }) => (
                        <SelectItem
                          key={departmentId}
                          value={departmentId.toString()}
                        >
                          {title}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                {formik.touched.registration?.departmentId &&
                  formik.errors.registration?.departmentId && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.registration.departmentId}
                    </p>
                  )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-center gap-16">
          <Button
            variant="outline"
            className="border-[#BABABA]"
            onClick={goPrevStep}
          >
            السابق
          </Button>
          <Button
            type="submit"
            className="bg-mainColor hover:bg-blue-700 text-white"
          >
            التسجيل
          </Button>
        </div>
      </form>
    </Container>
  );
}
