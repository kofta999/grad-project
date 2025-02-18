"use client";
import { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { hcWithType } from "@repo/mis-api";

const client = hcWithType("http://127.0.0.1:3000");

export default function RegistrationForm() {
  // State for form data
  const [formData, setFormData] = useState({
    fullNameAr: "",
    fullNameEn: "",
    gender: false,
    email: "",
    nationality: "",
    imageUrl: "",
    phoneNoMain: "",
    phoneNoSec: "",
    idType: "national_id" as "national_id" | "passport",
    idIssuanceDate: "",
    hashedPassword: "",
    secQuestion: "",
    secAnswer: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await client.auth.register.$post({
        json: {
          fullNameAr: formData.fullNameAr,
          fullNameEn: formData.fullNameEn,
          gender: formData.gender,
          email: formData.email,
          nationality: formData.nationality,
          imageUrl: formData.imageUrl,
          phoneNoMain: formData.phoneNoMain,
          phoneNoSec: formData.phoneNoSec,
          idType: formData.idType,
          hashedPassword: formData.hashedPassword,
          secQuestion: formData.secQuestion,
          secAnswer: formData.secAnswer,
          dob: "2020-10-10",
          idAuthority: "Suez",
          idIssuanceDate: "2020-10-10",
          idNumber: "1111111",
          isWorking: false,
          militaryStatus: "Exempted",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Registration successful:", result);
      alert("تم التسجيل بنجاح!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">
        نموذج التسجيل الأكاديمي
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        {/* Basic Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">المعلومات الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  الاسم الرباعي (بالانجليزية)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="fullNameEn"
                  value={formData.fullNameEn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  الاسم الرباعي (بالعربية)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="fullNameAr"
                  value={formData.fullNameAr}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  الجنسية
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  النوع (الجنس)
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      gender: value === "male",
                    }))
                  }
                  value={formData.gender ? "male" : "female"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  نوع الهوية
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      idType: value as "national_id" | "passport",
                    }))
                  }
                  value={formData.idType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الهوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national_id">هوية وطنية</SelectItem>
                    <SelectItem value="passport">جواز سفر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
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
                      )}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      <span>اختر التاريخ</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        formData.idIssuanceDate
                          ? new Date(formData.idIssuanceDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          idIssuanceDate: date?.toISOString() || "",
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">معلومات الاتصال</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  البريد الإلكتروني
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  رقم الهاتف
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  name="phoneNoMain"
                  value={formData.phoneNoMain}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  رقم الهاتف الثاني:
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  name="phoneNoSec"
                  value={formData.phoneNoSec}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>صورة الشخصية (رابط)</Label>
                <Input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">الأمان</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  كلمة المرور
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="password"
                  name="hashedPassword"
                  value={formData.hashedPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  تأكيد كلمة المرور
                  <span className="text-red-500">*</span>
                </Label>
                <Input type="password" required />
              </div>
              <div className="space-y-2">
                <Label>
                  سؤال الأمان
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="secQuestion"
                  value={formData.secQuestion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  إجابة سؤال الأمان
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="secAnswer"
                  value={formData.secAnswer}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            تسجيل
          </Button>
        </div>
      </form>
    </div>
  );
}
