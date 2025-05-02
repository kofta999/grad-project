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
import { usePathname } from "next/navigation";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";
import toast from "react-hot-toast";

type Step2Props = {
  goPrevStep: () => void;
  formik: FormikProps<RegisterStep2Type>;
};

export default function RegisterStep2Form({ goPrevStep, formik }: Step2Props) {
  const pathname = usePathname();

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const maxSizeInBytes = 2 * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
          toast.error("حجم الصورة الشخصية يجب ان لا يتجاوز 2 ميجا بايت");
          return;
        }
        const res = await apiClient.auth.upload.$post({ form: { file } });

        if (res.ok) {
          const { uploadUrl } = await res.json();
          formik.setFieldValue("imageUrl", uploadUrl);
        }
      }
    } catch (error) {
      toast.error("فشل في تحميل الصورة الشخصية");
    }
  };

  return (
    <Container>
      <ContainerTitle>
        {pathname === "/register" ? "تابع انشاء الحساب" : "تعديل بيانات الطالب"}
      </ContainerTitle>
      <form onSubmit={formik.handleSubmit}>
        {/* Identity Information */}
        <Card>
          <CardContent>
            <CardHeader>الهوية</CardHeader>
            <CardGrid>
              <SpacingWrapper>
                <Label>
                  نوع الهوية
                  {pathname === "/register" && <span className="text-red-500">*</span>}
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
                  <ErrorMessage message={formik.errors.idType} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  رقم الهوية
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="idNumber"
                  value={formik.values.idNumber}
                  onChange={formik.handleChange}
                  icon={<CreditCard className="h-4 w-4" />}
                />
                {formik.touched.idNumber && formik.errors.idNumber && (
                  <ErrorMessage message={formik.errors.idNumber} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  تاريخ اصدار الهوية
                  {pathname === "/register" && <span className="text-red-500">*</span>}
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
                  <ErrorMessage message={formik.errors.idIssuanceDate as string} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  جهة الاصدار
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="idAuthority"
                  value={formik.values.idAuthority}
                  onChange={formik.handleChange}
                  icon={<Building className="h-4 w-4" />}
                />
                {formik.touched.idAuthority && formik.errors.idAuthority && (
                  <ErrorMessage message={formik.errors.idAuthority} />
                )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardContent>
            <CardHeader>معلومات إضافية</CardHeader>
            <CardGrid>
              <SpacingWrapper>
                <Label>
                  الحالة الاجتماعية
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Select
                  name="maritalStatus"
                  value={formik.values.martialStatus}
                  onValueChange={(value: string) => formik.setFieldValue("martialStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة الاجتماعية" />
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
                  <ErrorMessage message={formik.errors.martialStatus} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  الحالة العسكرية
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Select
                  name="militaryStatus"
                  value={formik.values.militaryStatus}
                  onValueChange={(value: string) => formik.setFieldValue("militaryStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة العسكرية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">أدى الخدمة</SelectItem>
                    <SelectItem value="postponed">مؤجل</SelectItem>
                    <SelectItem value="permanent-exempt">معفي نهائي</SelectItem>
                    <SelectItem value="temporary-exempt">معفي مؤقت</SelectItem>
                    <SelectItem value="required">مطلوب للتجنيد</SelectItem>
                    <SelectItem value="not-requested">لم يصدر له طلب</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.militaryStatus && formik.errors.militaryStatus && (
                  <ErrorMessage message={formik.errors.militaryStatus} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  الطالب يعمل؟
                  {pathname === "/register" && <span className="text-red-500">*</span>}
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
                  <ErrorMessage message={formik.errors.isWorking} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>جهة العمل</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={formik.values.jobType as any}
                  onChange={formik.handleChange}
                  disabled={!formik.values.isWorking}
                  icon={<Briefcase className="h-4 w-4" />}
                />
              </SpacingWrapper>
              {formik.touched.jobType && formik.errors.jobType && (
                <ErrorMessage message={formik.errors.jobType} />
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
                <ErrorMessage
                  message="* يجب أن لا يزيد الملف عن 2 ميجا بايت"
                  className="mt-2 text-center"
                />
              </div>
            </div>
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <ErrorMessage message={formik.errors.imageUrl} />
            )}
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-center items-center gap-16">
          <Button variant="outline" className="border-[#BABABA]" onClick={goPrevStep}>
            السابق
          </Button>
          <Button className="bg-mainColor hover:bg-blue-700 text-white" type="submit">
            {pathname === "/register" ? "التسجيل" : "تعديل"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
