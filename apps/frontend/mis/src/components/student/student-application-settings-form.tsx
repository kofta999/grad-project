"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

type InitialValues = {
  faculty: string;
  academicDegree: string;
  academicProgram: string;
  specialization: string;
};

const validationSchema = Yup.object().shape({
  faculty: Yup.string()
    .matches(/^[\u0621-\u064A\s]+$/, "الكلية يجب أن تحتوي على أحرف عربية فقط")
    .required("الكلية مطلوبة"),

  academicDegree: Yup.string()
    .matches(/^[\u0621-\u064A\s]+$/, "الفرقة يجب أن تحتوي على أحرف عربية فقط")
    .required("الفرقة مطلوبة"),

  academicProgram: Yup.string()
    .matches(/^[\u0621-\u064A\s]+$/, "القسم يجب أن يحتوي على أحرف عربية فقط")
    .required("القسم مطلوب"),

  specialization: Yup.string()
    .matches(/^[\u0621-\u064A\s]+$/, "الشعبة يجب أن تحتوي على أحرف عربية فقط")
    .required("الشعبة مطلوبة"),
});

export default function StudentApplicationSettingsForm() {
  const formik = useFormik<InitialValues>({
    initialValues: {
      faculty: "",
      academicDegree: "",
      academicProgram: "",
      specialization: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">الإعدادات</h1>
        <p>يمكنك الاطلاع علي اعدادات التسجيل الخاص بك</p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto space-y-6">
          <Card>
            <CardContent>
              <CardContent className="rounded-lg border shadow-sm p-0">
                <CardHeader className="border-b py-3 pr-4 mb-0">التفاصيل الدراسية</CardHeader>
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="space-y-2">
                    <Label>الكلية</Label>
                    <Input
                      name="faculty"
                      value={formik.values.faculty}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="الهندسة"
                    />
                    {formik.touched.faculty && formik.errors.faculty && (
                      <p className="text-red-500 text-sm">{formik.errors.faculty}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>الفرقة</Label>
                    <Input
                      name="academicDegree"
                      value={formik.values.academicDegree}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="ماجستير"
                    />
                    {formik.touched.academicDegree && formik.errors.academicDegree && (
                      <p className="text-red-500 text-sm">{formik.errors.academicDegree}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>القسم</Label>
                    <Input
                      name="academicProgram"
                      value={formik.values.academicProgram}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="كهرباء"
                    />
                    {formik.touched.academicProgram && formik.errors.academicProgram && (
                      <p className="text-red-500 text-sm">{formik.errors.academicProgram}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>الشعبة</Label>
                    <Input
                      name="specialization"
                      value={formik.values.specialization}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="حاسبات وتحكم"
                    />
                    {formik.touched.specialization && formik.errors.specialization && (
                      <p className="text-red-500 text-sm">{formik.errors.specialization}</p>
                    )}
                  </div>

                  <Button type="submit">تعديل</Button>
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </div>
      </form>
    </Container>
  );
}
