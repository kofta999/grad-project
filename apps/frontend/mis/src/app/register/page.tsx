"use client"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function RegistrationForm() {
  // state for array index == formStep
  // [Register1, Register2]
  // initialState = 0
  // state += 1, state -= 1 + Submit
  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">نموذج التسجيل الأكاديمي</h1>
      
      <div className="max-w-3xl mx-auto space-y-8">
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
                    <Button variant={"outline"} className={cn("w-full justify-start text-right font-normal")}>
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      <span>اختر التاريخ</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
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
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
        <Link href="/register/step2">
           <button className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white">
               التالي
          </button>
         </Link>
        </div>
       </div>
    </div>
    
  )
}
