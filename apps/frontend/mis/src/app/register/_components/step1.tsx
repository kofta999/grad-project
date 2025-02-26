import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardGrid } from "@/components/ui/card";
import { CalendarIcon, Flag, User, Mail, Printer, UserCheck, Eye, Phone, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Container, ContainerTitle } from "@/components/ui/container";
import { FormType, registerSchema } from "../page";
import toast from 'react-hot-toast';
import { FormikProps } from 'formik';


interface Step1Props {
  updateStep: () => void;
  formData: FormType;
  formik: FormikProps<FormType>
}

export default function Step1({
  updateStep,
  formik
}: Step1Props) { 


// Handle form submission
  const handleStep1Submit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await formik.validateForm();
    if (Object.keys(formik.errors).length === 0) {
      toast.success("تم التسجيل بنجاح!");
      updateStep();
    } else {
      toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
    }
  } catch (err) {
    toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
  }
};

  return (
    <Container>
      <ContainerTitle>إنشاء حساب جديد</ContainerTitle>
      <form onSubmit={handleStep1Submit}>
        {/* Basic Information */}
        <Card>
          <CardContent>
            <CardHeader>المعلومات الأساسية</CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  الاسم الرباعي (بالعربية)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="fullNameAr"
                  value={formik.values.fullNameAr}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<User className="h-4 w-4" />}
                />
                {formik.touched.fullNameAr && formik.errors.fullNameAr && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.fullNameAr}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  الاسم الرباعي (بالانجليزية)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="fullNameEn"
                  value={formik.values.fullNameEn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<User className="h-4 w-4" />}
                />
                {formik.touched.fullNameEn && formik.errors.fullNameEn && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.fullNameEn}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  النوع (الجنس)
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.gender ? "male" : "female"}
                  onValueChange={(value: "male" | "female") =>
                    formik.setFieldValue("gender", value === "male")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  الجنسية
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="nationality"
                  value={formik.values.nationality}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Flag className="h-4 w-4" />}
                />
                {formik.touched.nationality && formik.errors.nationality && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.nationality}
                  </p>
                )}
              </div>
              <div className="space-y-2 col-span-2 justify-self-center w-full max-w-[calc(100%/2)]">
                <Label>
                  تاريخ الميلاد
                  <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-right font-normal",
                        !formik.values.dob && "text-muted-foreground"
                      )}
                    >
                      {formik.values.dob ? (
                        // Format the date for display
                        formik.values.dob.toLocaleDateString("en-US")
                      ) : (
                        <span>اختر التاريخ</span>
                      )}
                      <CalendarIcon className="mr-auto h-4 w-4 text-mainColor" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formik.values.dob}
                      onSelect={(date) => {
                        if (date) {
                          formik.setFieldValue("dob", date);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formik.touched.dob && formik.errors.dob && (
                  <p className="text-red-500 text-sm">{formik.errors.dob}</p>
                )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6">
            <CardHeader className="text-lg font-semibold mb-4">
              معلومات الاتصال
            </CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  البريد الإلكتروني
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Mail className="h-4 w-4" />}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>فاكس</Label>
                <Input
                  type="tel"
                  name="fax"
                  value={formik.values.fax ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Printer className="h-4 w-4" />}
                />
                {formik.touched.fax && formik.errors.fax && (
                  <p className="text-red-500 text-sm">{formik.errors.fax}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  رقم الهاتف
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  name="phoneNoMain"
                  value={formik.values.phoneNoMain}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Phone className="h-4 w-4" />}
                />
                {formik.touched.phoneNoMain && formik.errors.phoneNoMain && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.phoneNoMain}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>رقم هاتف آخر</Label>
                <Input
                  type="tel"
                  name="phoneNoSec"
                  value={formik.values.phoneNoSec ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Phone className="h-4 w-4" />}
                />
                {formik.touched.phoneNoSec && formik.errors.phoneNoSec && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.phoneNoSec}
                  </p>
                )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardContent className="pt-6">
            <CardHeader className="text-lg font-semibold mb-4">
              الأمان
            </CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  كلمة المرور
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="password"
                  name="hashedPassword"
                  value={formik.values.hashedPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Eye className="h-4 w-4" />}
                />
                {formik.touched.hashedPassword &&
                  formik.errors.hashedPassword && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.hashedPassword}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label>
                  تأكيد كلمة المرور
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Eye className="h-4 w-4" />}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label>
                  سؤال الأمان
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="secQuestion"
                  value={formik.values.secQuestion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Shield className="h-4 w-4" />}
                />
                {formik.touched.secQuestion && formik.errors.secQuestion && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.secQuestion}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>
                  إجابة سؤال الأمان
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="secAnswer"
                  value={formik.values.secAnswer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<UserCheck className="h-4 w-4" />}
                />
                {formik.touched.secAnswer && formik.errors.secAnswer && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.secAnswer}
                  </p>
                )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center">
          <Button
            className="px-8 py-2 bg-mainColor hover:bg-blue-700 text-white"
            type="submit"
          >
            التالي
          </Button>
        </div>
      </form>
    </Container>
  );
};
