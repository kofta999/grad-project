"use client";
import Link from "next/link";
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Container, ContainerTitle } from "@/components/ui/container";
import { useState } from "react";

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
      const res = await client.auth.register1.$post({
        json: {
          fullNameAr: formData.fullNameAr,
          fullNameEn: formData.fullNameEn,
          gender: formData.gender,
          email: formData.email,
          nationality: formData.nationality,
          imageUrl: formData.imageUrl,
          phoneNoMain: formData.phoneNoMain,
          idType: formData.idType,
          idIssuanceDate: formData.idIssuanceDate,
          hashedPassword: formData.hashedPassword,
          secQuestion: formData.secQuestion,
          secAnswer: formData.secAnswer,
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
    <Container>
      <ContainerTitle>نموذج التسجيل الأكاديمي</ContainerTitle>

      {/* Basic Information */}
      <Card>
        <CardContent>
          <CardHeader>المعلومات الأساسية</CardHeader>
          <CardGrid>
            <div className="space-y-2">
              <Label>
                الاسم الرباعي (بالانجليزية)
                <span className="text-red-500">*</span>
              </Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>
                الاسم الرباعي (بالعربية)
                <span className="text-red-500">*</span>
              </Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>
                الجنسية
                <span className="text-red-500">*</span>
              </Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>
                النوع (الجنس)
                <span className="text-red-500">*</span>
              </Label>
              <Select>
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
                  <Calendar mode="single" initialFocus />
                </PopoverContent>
              </Popover>
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
              <Input type="email" />
            </div>
            <div className="space-y-2">
              <Label>
                رقم الهاتف
                <span className="text-red-500">*</span>
              </Label>
              <Input type="tel" />
            </div>
            <div className="space-y-2">
              <Label>رقم هاتف آخر</Label>
              <Input type="tel" />
            </div>
          </CardGrid>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardContent className="pt-6">
          <CardHeader className="text-lg font-semibold mb-4">الأمان</CardHeader>
          <CardGrid>
            <div className="space-y-2">
              <Label>
                كلمة المرور
                <span className="text-red-500">*</span>
              </Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>
                تأكيد كلمة المرور
                <span className="text-red-500">*</span>
              </Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>
                سؤال الأمان
                <span className="text-red-500">*</span>
              </Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>
                إجابة سؤال الأمان
                <span className="text-red-500">*</span>
              </Label>
              <Input />
            </div>
          </CardGrid>
        </CardContent>
      </Card>

      <div className="flex justify-center items-center">
        <Link href="/register/step2">
          <Button className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            التالي
          </Button>
        </Link>
      </div>
    </Container>
  );
}
