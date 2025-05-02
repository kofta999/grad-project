import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardGrid, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase, Building, CalendarIcon, CreditCard, Shield, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Container, ContainerTitle } from "@/components/ui/container";
import { apiClient } from "@/lib/client";
import { FormikProps } from "formik";
import DatePicker from "@/components/ui/date-picker";
import { RegisterStep2Type } from "@/lib/types";

type Step2Props = {
  goPrevStep: () => void;
  formik: FormikProps<RegisterStep2Type>;
};

export default function RegisterStep2Form({ goPrevStep, formik }: Step2Props) {
  const { role } = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const res = await apiClient.auth.upload.$post({ form: { file } });

      if (res.ok) {
        const { uploadUrl } = await res.json();
        console.log(uploadUrl);
        formik.setFieldValue("imageUrl", uploadUrl);
      }
    }
  };

  return (
    <Container>
      <ContainerTitle>
        {role === "admin" ? "تعديل بيانات الطالب" : "تابع انشاء الحساب"}
      </ContainerTitle>
      <form onSubmit={formik.handleSubmit}>
        {/* Identity Information */}
        <Card>
          <CardContent>
            <CardHeader>الهوية</CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  نوع الهوية
                  {role === "student" && <span className="text-red-500">*</span>}
                </Label>
                <Select
                  name="idType"
                  value={formik.values.idType}
                  onValueChange={(value: string) => formik.setFieldValue("idType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الهوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national_id">بطاقة وطنية</SelectItem>
                    <SelectItem value="passport">جواز سفر</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.idType && formik.errors.idType && (
                  <p className="text-red-500 text-sm">
                    <>{formik.errors.idType}</>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  رقم الهوية
                  {role === "student" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="idNumber"
                  value={formik.values.idNumber}
                  onChange={formik.handleChange}
                  icon={<CreditCard className="h-4 w-4" />}
                />
                {formik.touched.idNumber && formik.errors.idNumber && (
                  <p className="text-red-500 text-sm">
                    <>{formik.errors.idNumber}</>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  تاريخ اصدار الهوية
                  {role === "student" && <span className="text-red-500">*</span>}
                </Label>
                <DatePicker
                  value={
                    formik.values.idIssuanceDate
                      ? new Date(formik.values.idIssuanceDate)
                      : undefined
                  }
                  onChange={(date) => formik.setFieldValue("idIssuanceDate", date)}
                  placeholder="اختر تاريخ اصدار الهوية"
                />
                {formik.touched.idIssuanceDate && formik.errors.idIssuanceDate && (
                  <p className="text-red-500 text-sm">
                    <>{formik.errors.idIssuanceDate as string}</>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  جهة الاصدار
                  {role === "student" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="idAuthority"
                  value={formik.values.idAuthority}
                  onChange={formik.handleChange}
                  icon={<Building className="h-4 w-4" />}
                />
                {formik.touched.idAuthority && formik.errors.idAuthority && (
                  <p className="text-red-500 text-sm">
                    <>{formik.errors.idAuthority}</>
                  </p>
                )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardContent>
            <CardHeader>معلومات إضافية</CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  الحالة الاجتماعية
                  {role === "student" && <span className="text-red-500">*</span>}
                </Label>
                <Select
                  name="maritalStatus"
                  value={formik.values.martialStatus}
                  onValueChange={(value: string) => formik.setFieldValue("martialStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">أعزب</SelectItem>
                    <SelectItem value="married">متزوج</SelectItem>
                    <SelectItem value="married_with_dependents">متزوج ويعول</SelectItem>
                    <SelectItem value="divorced">مطلق</SelectItem>
                    <SelectItem value="widowed">أرمل</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>

                {formik.touched.martialStatus && formik.errors.martialStatus && (
                  <p className="text-red-500 text-sm">
                    <>{formik.errors.martialStatus}</>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  الحالة العسكرية
                  {role === "student" && <span className="text-red-500">*</span>}
                </Label>
                <Select
                  value={formik.values.militaryStatus}
                  onValueChange={(value: string) => formik.setFieldValue("militaryStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة العسكرية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="أدى الخدمة">أدى الخدمة</SelectItem>
                    <SelectItem value="مؤجل">مؤجل</SelectItem>
                    <SelectItem value="معفي نهائي">معفي نهائي</SelectItem>
                    <SelectItem value="معفي مؤقت">معفي مؤقت</SelectItem>
                    <SelectItem value="مطلوب للتجنيد">مطلوب للتجنيد</SelectItem>
                    <SelectItem value="لم يصدر له طلب">لم يصدر له طلب</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.militaryStatus && formik.errors.militaryStatus && (
                  <p className="text-red-500 text-sm">
                    <>{formik.errors.militaryStatus}</>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  الطالب يعمل؟
                  {role === "student" && <span className="text-red-500">*</span>}
                </Label>
                <RadioGroup
                  name="isWorking"
                  value={formik.values.isWorking ? "yes" : "no"}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("isWorking", value === "yes")
                  }
                  className="flex gap-4 pt-2 justify-end"
                >
                  <div className="flex items-center gap-2 space-x-2 space-x-reverse">
                    <Label htmlFor="yes">نعم</Label>
                    <RadioGroupItem value="yes" id="yes" />
                  </div>
                  <div className="flex items-center gap-2 space-x-2 space-x-reverse">
                    <Label htmlFor="no">لا</Label>
                    <RadioGroupItem value="no" id="no" />
                  </div>
                </RadioGroup>
                {formik.touched.isWorking && formik.errors.isWorking && (
                  <p className="text-red-500 text-sm">
                    <>{formik.errors.isWorking}</>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>جهة العمل</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={formik.values.jobType as any}
                  onChange={formik.handleChange}
                  disabled={!formik.values.isWorking}
                  icon={<Briefcase className="h-4 w-4" />}
                />
              </div>
              {formik.touched.jobType && formik.errors.jobType && (
                <p className="text-red-500 text-sm">
                  <>{formik.errors.jobType}</>
                </p>
              )}
            </CardGrid>
          </CardContent>
        </Card>

        {/* Personal Photo */}
        <Card>
          <CardContent>
            <CardHeader>الصورة الشخصية</CardHeader>
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {formik.values.imageUrl ? (
                  <Image
                    src={formik.values.imageUrl || "/placeholder.svg"}
                    alt="Personal photo"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="w-full">
                <Label className="w-full">
                  <div className="bg-mainColor py-3 px-4 rounded text-center cursor-pointer hover:bg-blue-700 transition-colors text-white">
                    اختر صورة للتحميل
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </Label>
                <p className="text-sm text-red-500 text-center mt-2">
                  * يجب أن لا يزيد الملف عن 2 ميجا بايت
                </p>
              </div>
            </div>
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <p className="text-red-500 text-sm">
                <>{formik.errors.imageUrl}</>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-center gap-16">
          <Button variant="outline" className="border-[#BABABA]" onClick={goPrevStep}>
            السابق
          </Button>
          <Button className="bg-mainColor hover:bg-blue-700 text-white" type="submit">
            {role === "admin" ? "تعديل" : "التسجيل"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
