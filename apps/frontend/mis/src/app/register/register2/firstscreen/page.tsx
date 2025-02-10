"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistrationFormPart3() {
  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">بيانات التسجيل</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Permanent Address */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">العنوان الدائم</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>رقم المنزل</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>الشارع</Label>
                <Input />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>
                  محافظة / مدينة / شارع / حي
                  <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Address */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">العنوان الحالي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  محافظة / مدينة / شارع / حي
                  <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الشارع</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>رقم المنزل</Label>
                <Input />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reference Persons */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">شخصيات يمكن الرجوع اليها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>التليفون</Label>
                <Input type="tel" />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input type="email" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button variant="outline">السابق</Button>
          <Button className="bg-gray-600 hover:bg-gray-700 text-white">التالي</Button>
        </div>
      </div>
    </div>
  )
}

