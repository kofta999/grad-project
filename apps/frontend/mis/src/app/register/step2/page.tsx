"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardGrid, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { Link } from "./../../../../../../../packages/ui/src/link/index";
import { Container, ContainerTitle } from "@/components/ui/container";

export default function RegistrationFormPart2() {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  return (
    <Container>
      <ContainerTitle>تابع نموذج التسجيل الأكاديمي</ContainerTitle>
        {/* Identity Information */}
        <Card>
          <CardContent>
            <CardHeader>الهوية</CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  نوع الهوية<span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الهوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">بطاقة وطنية</SelectItem>
                    <SelectItem value="passport">جواز سفر</SelectItem>
                    <SelectItem value="residence">إقامة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  رقم الهوية<span className="text-red-500">*</span>
                </Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>
                  تاريخ اصدار الهوية<span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between text-right font-normal"
                    >
                      <span>اختر التاريخ</span>
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>
                  جهة الاصدار<span className="text-red-500">*</span>
                </Label>
                <Input />
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
                  الحالة الاجتماعية<span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">أعزب</SelectItem>
                    <SelectItem value="married">متزوج</SelectItem>
                    <SelectItem value="divorced">مطلق</SelectItem>
                    <SelectItem value="widowed">أرمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  الحالة العسكرية<span className="text-red-500">*</span>
                </Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>جهة العمل</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>
                  الطالب يعمل؟<span className="text-red-500">*</span>
                </Label>
                <RadioGroup defaultValue="no" className="flex gap-4 pt-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">نعم</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">لا</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Personal Photo */}
        <Card>
          <CardContent>
            <CardHeader>الصورة الشخصية</CardHeader>
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {photoUrl ? (
                  <Image
                    src={photoUrl || "/placeholder.svg"}
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
                  <div className="bg-gray-100 py-3 px-4 rounded text-center cursor-pointer hover:bg-gray-200 transition-colors">
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
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button variant="outline">السابق</Button>
          </Link>
          <Link href="/applications">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">
              التسجيل
            </Button>
          </Link>
        </div>
    </Container>
  );
}
