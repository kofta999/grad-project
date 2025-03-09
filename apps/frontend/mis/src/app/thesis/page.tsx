"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function ArabicForm() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //will be added when we are done with the api
    console.log("Form submitted")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-8">محتوى الرسالة</h1>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-lg">
            <span className="font-semibold">اسم الطالب :</span> لؤي احمد محمد رشاد
          </p>
          <p className="text-lg">
            <span className="font-semibold">الدرجة العلمية :</span> دكتوراة
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-lg font-semibold block">
              عنوان الرسالة:
            </label>
            <Input id="title" className="w-full border-2 border-gray-300 rounded-md p-3 h-12" placeholder="" />
          </div>

          <div className="space-y-2">
            <label htmlFor="introduction" className="text-lg font-semibold block">
              المقدمة:
            </label>
            <Textarea
              id="introduction"
              className="w-full border-2 border-gray-300 rounded-md p-3 min-h-[150px]"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold block">أدخل محتوى الرسالة PDF:</label>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="order-2 md:order-1">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md">
                  تسليم
                </Button>
              </div>

              <div className="order-1 md:order-2 w-full md:w-auto">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-gray-600">
                    <Upload className="h-5 w-5" />
                    <span>إضافة الملف</span>
                  </div>
                  <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                </label>
                {file && <p className="mt-2 text-sm text-gray-600">تم اختيار: {file.name}</p>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

