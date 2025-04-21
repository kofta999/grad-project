import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Settings() {
  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">الاعدادات</h1>
        <p>يمكنك الاطلاع علي اعدادات الحساب الخاص بك</p>
      </div>

      <div className="mx-auto space-y-6">
        <Card>
          <CardContent>
            <CardHeader>تفاصيل الحساب</CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardContent className="rounded-lg border shadow-sm p-0">
                <CardHeader className="border-b py-3 pr-4 mb-0">التفاصيل الشخصية</CardHeader>
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="space-y-2">
                    <Label>الاسم بالكامل</Label>
                    <Input placeholder="زياد السيد ابراهيم" />
                  </div>
                  <div className="space-y-2">
                    <Label>كلمة السر</Label>
                    <Input placeholder="Ziad@R12" />
                  </div>
                  <div className="space-y-2">
                    <Label>البريد الالكتروني الجامعي</Label>
                    <Input placeholder="Ziad046@scu.edu.org" />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الهاتف</Label>
                    <Input placeholder="0128215850" />
                  </div>
                  <Button className="bg-[#E6F2FF] text-[#007AFF]">تعديل</Button>
                </div>
              </CardContent>
              <CardContent className="rounded-lg border shadow-sm p-0">
                <CardHeader className="border-b py-3 pr-4 mb-0">التفاصيل الدراسية</CardHeader>
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="space-y-2">
                    <Label>الكلية</Label>
                    <Input placeholder="الهندسة" />
                  </div>
                  <div className="space-y-2">
                    <Label>الفرقة</Label>
                    <Input placeholder="ماجستير" />
                  </div>
                  <div className="space-y-2">
                    <Label>القسم</Label>
                    <Input placeholder="كهرباء" />
                  </div>
                  <div className="space-y-2">
                    <Label>الشعبة</Label>
                    <Input placeholder="حاسبات وتحكم" />
                  </div>
                  <Button className="bg-[#E6F2FF] text-[#007AFF]">تعديل</Button>
                </div>
              </CardContent>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
