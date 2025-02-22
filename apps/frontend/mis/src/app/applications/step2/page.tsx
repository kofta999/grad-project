import { Container, ContainerTitle } from "@/components/ui/container";
import React from "react";
import { Card, CardContent, CardHeader, CardGrid } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";


export default function ApplicationFormPart2() {
  return (
    <>
      <Container>
        <ContainerTitle>تابع بيانات التسجيل</ContainerTitle>
        <form>
          <Card>
            <CardContent>
              <CardHeader>المؤهل المتقدم به</CardHeader>
              <CardGrid>
                <div className="space-y-2">
                  <Label>الدولة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    الجامعة
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    الكلية
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    نوع المؤهل
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    المؤهل
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    التخصص
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    سنة المؤهل
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    تاريخ الحصول عليه
                    <span className="text-red-500">*</span>
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
                  <Label>نوع الدراسة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>التقدير</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>النسبة المئوية / المعدل التراكمي</Label>
                  <Input />
                </div>
              </CardGrid>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader>المؤهل المتقدم به</CardHeader>
              <CardGrid>
                <div className="space-y-2">
                  <Label>العام الاكاديمي للتسجيل</Label>
                  <span className="text-red-500">*</span>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>الكلية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    الدرجات العلمية
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    البرامج / التخصص
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardGrid>
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
                التالي
              </Button>
            </Link>
          </div>
        </form>
      </Container>
    </>
  );
}
