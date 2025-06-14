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
import { Card, CardContent, CardHeader, CardGrid, CardTitle } from "@/components/ui/card";
import { Flag, User, Mail, Printer, UserCheck, Phone, Shield, Info, ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, ContainerTitle } from "@/components/ui/container";
import { FormikProps } from "formik";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import DatePicker from "@/components/ui/date-picker";
import { RegisterStep1Type } from "@/lib/types";
import { usePathname } from "next/navigation";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";

interface Step1Props {
  formik: FormikProps<RegisterStep1Type>;
}

export default function RegisterStep1Form({ formik }: Step1Props) {
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container>
      <ContainerTitle>
        {pathname === "/register" ? "انشاء حساب جديد" : "تعديل بيانات الطالب"}
      </ContainerTitle>
      <form onSubmit={formik.handleSubmit}>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Info className="text-yellow-200" />
              المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGrid>
              <SpacingWrapper>
                <Label>
                  الاسم الرباعي (بالعربية)
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="fullNameAr"
                  value={formik.values.fullNameAr}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<User className="h-4 w-4" />}
                />
                {formik.touched.fullNameAr && formik.errors.fullNameAr && (
                  <ErrorMessage message={formik.errors.fullNameAr} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  الاسم الرباعي (بالانجليزية)
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="fullNameEn"
                  value={formik.values.fullNameEn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<User className="h-4 w-4" />}
                />
                {formik.touched.fullNameEn && formik.errors.fullNameEn && (
                  <ErrorMessage message={formik.errors.fullNameEn} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  النوع (الجنس)
                  {pathname === "/register" && <span className="text-red-500">*</span>}
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
                  <ErrorMessage message={formik.errors.gender} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  الجنسية
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="nationality"
                  value={formik.values.nationality}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Flag className="h-4 w-4" />}
                />
                {formik.touched.nationality && formik.errors.nationality && (
                  <ErrorMessage message={formik.errors.nationality} />
                )}
              </SpacingWrapper>
              <SpacingWrapper className="md:col-span-2 md:justify-self-center md:w-full md:max-w-[calc(100%/2)]">
                <Label>
                  تاريخ الميلاد
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <DatePicker
                  value={formik.values.dob ? new Date(formik.values.dob) : undefined}
                  onChange={(date) => formik.setFieldValue("dob", date)}
                  placeholder="اختر تاريخ الميلاد"
                />
                {formik.touched.dob && formik.errors.dob && (
                  <ErrorMessage message={formik.errors.dob as string} />
                )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Phone className="text-yellow-200" />
              معلومات الاتصال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGrid>
              <SpacingWrapper className="space-y-2">
                <Label>
                  البريد الإلكتروني
                  {pathname === "/register" && <span className="text-red-500">*</span>}
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
                  <ErrorMessage message={formik.errors.email} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
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
                  <ErrorMessage message={formik.errors.fax} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  رقم الهاتف
                  {pathname === "/register" && <span className="text-red-500">*</span>}
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
                  <ErrorMessage message={formik.errors.phoneNoMain} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
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
                  <ErrorMessage message={formik.errors.phoneNoSec} />
                )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>
              <ShieldOff className="text-yellow-200" />
              الأمان
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGrid>
              <SpacingWrapper>
                <Label>
                  كلمة المرور
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="hashedPassword"
                  value={formik.values.hashedPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
                {formik.touched.hashedPassword && formik.errors.hashedPassword && (
                  <ErrorMessage message={formik.errors.hashedPassword} />
                )}
              </SpacingWrapper>
              <SpacingWrapper>
                <Label>
                  تأكيد كلمة المرور
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <ErrorMessage message={formik.errors.confirmPassword} />
                )}
              </SpacingWrapper>
              <SpacingWrapper className={cn({ hidden: pathname !== "/register" })}>
                <Label>
                  سؤال الأمان
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="secQuestion"
                  value={formik.values.secQuestion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<Shield className="h-4 w-4" />}
                />
                {formik.touched.secQuestion && formik.errors.secQuestion && (
                  <ErrorMessage message={formik.errors.secQuestion} />
                )}
              </SpacingWrapper>
              <SpacingWrapper className={cn({ hidden: pathname !== "/register" })}>
                <Label>
                  إجابة سؤال الأمان
                  {pathname === "/register" && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  name="secAnswer"
                  value={formik.values.secAnswer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon={<UserCheck className="h-4 w-4" />}
                />
                {formik.touched.secAnswer && formik.errors.secAnswer && (
                  <ErrorMessage message={formik.errors.secAnswer} />
                )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center">
          <Button
            disabled={Object.keys(formik.errors).length > 0}
            className="px-8 py-2 bg-mainColor hover:bg-blue-700 text-white"
            type="submit"
          >
            {pathname === "/register" ? "التالي" : "تعديل"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
