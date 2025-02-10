"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useState } from "react"

export default function RegistrationFormPart2() {
  const [photoUrl, setPhotoUrl] = useState<string>("")

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPhotoUrl(url)
    }
  }

  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">تابع نموذج التسجيل الأكاديمي</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Identity Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">الهوية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  نوع الهوية
                  <span className="text-red-500">*</span>
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
                  رقم الهوية
                  <span className="text-red-500">*</span>
                </Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>
                  تاريخ اصدار الهوية
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
              <div className="space-y-2">
                <Label>
                  جهة الاصدار
                  <span className="text-red-500">*</span>
                </Label>
                <Input />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">معلومات إضافية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  الحالة الاجتماعية
                  <span className="text-red-500">*</span>
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
                  الحالة العسكرية
                  <span className="text-red-500">*</span>
                </Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>جهة العمل</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>
                  الطالب يعمل؟
                  <span className="text-red-500">*</span>
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
            </div>
          </CardContent>
        </Card>

        {/* Personal Photo */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">الصورة الشخصية</h2>
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
                  <Input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </Label>
                <p className="text-sm text-red-500 text-center mt-2">* يجب أن لا يزيد الملف عن 2 ميجا بايت</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button variant="outline">السابق</Button>
          <Button className="bg-gray-600 hover:bg-gray-700 text-white">التسجيل</Button>
        </div>
      </div>
    </div>
  )
}

