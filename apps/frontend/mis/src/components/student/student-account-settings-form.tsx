"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProps } from "formik";
import React from "react";

type FormProps = {
  formik: FormikProps<{
    fullNameAr: string;
    hashedPassword: string;
    email: string;
    phoneNoMain: string;
  }>;
};

export default function StudentAccountSettingsForm({ formik }: FormProps) {
  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">الإعدادات</h1>
        <p>يمكنك الاطلاع على إعدادات الحساب الخاص بك</p>
      </div>

      <div className="mx-auto space-y-6">
        <Card>
          <CardContent>
            <CardContent className="rounded-lg border shadow-sm p-0">
              <CardHeader className="border-b py-3 pr-4 mb-0">التفاصيل الشخصية</CardHeader>
              <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4 p-4">
                <div className="space-y-2">
                  <Label>الاسم بالكامل</Label>
                  <Input
                    name="fullNameAr"
                    value={formik.values.fullNameAr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fullNameAr && formik.errors.fullNameAr && (
                    <p className="text-red-500 text-sm">{formik.errors.fullNameAr}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>كلمة السر</Label>
                  <Input
                    name="hashedPassword"
                    type="password"
                    value={formik.values.hashedPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.hashedPassword && formik.errors.hashedPassword && (
                    <p className="text-red-500 text-sm">{formik.errors.hashedPassword}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني الجامعي</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <Input
                    name="phoneNoMain"
                    value={formik.values.phoneNoMain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phoneNoMain && formik.errors.phoneNoMain && (
                    <p className="text-red-500 text-sm">{formik.errors.phoneNoMain}</p>
                  )}
                </div>
                <Button type="submit" className="bg-[#E6F2FF] text-[#007AFF]">
                  تعديل
                </Button>
              </form>
            </CardContent>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
