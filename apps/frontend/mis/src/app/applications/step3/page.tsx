import React from 'react'
import { Container, ContainerTitle } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardGrid } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload,File, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function ApplicationFormPart3() {
  return (
    <Container>
      <ContainerTitle>تابع بيانات التسجيل</ContainerTitle>
      <form>
        <Card>
          <CardContent>
            <CardHeader>رفع المستندات المطلوبة</CardHeader>
            <div className="space-y-2">
              <Label>
                نوع الهوية
                <span className="text-red-500">*</span>
              </Label>
              <Input />
            </div>

            <div className="bg-[#dcdcdc] p-6 mt-6 rounded-sm">
              <div className="w-full flex flex-col justify-center items-center">
                <Upload className="block text-[#9ca3af] mb-2" />
                <Label className="w-full">
                  <div className="bg-gray-100 py-3 px-4 rounded text-center cursor-pointer hover:bg-gray-200 transition-colors">
                    اختر صورة للتحميل
                  </div>
                  <Input type="file" accept="" className="hidden" />
                </Label>
                <p className="text-sm text-red-500 text-center mt-2">
                  * يجب أن لا يزيد الملف عن 2 ميجا بايت
                </p>
              </div>
            </div>

            <Card>
              <div className="space-y-2 border-b">
                <div className="file flex justify-between items-center p-4">
                  <File />
                  <p>image.jpg</p>
                  <p>البطاقة الشخصية</p>
                  <Trash2 className="text-red-500 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2 border-b">
                <div className="file flex justify-between items-center p-4">
                  <File />
                  <p>image1.jpg</p>
                  <p>شهادة الميلاد</p>
                  <Trash2 className="text-red-500 cursor-pointer" />
                </div>
              </div>
            </Card>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Link href="/applications">
            <Button variant="outline">السابق</Button>
          </Link>
          <Link href="/applications/step3">
            <Button
              className="bg-gray-600 hover:bg-gray-700 text-white"
              type="submit"
            >
              التسجيل
            </Button>
          </Link>
        </div>
      </form>
    </Container>
  );
}
