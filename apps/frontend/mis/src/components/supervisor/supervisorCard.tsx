"use client";
import { User, CalendarDays } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Supervisor } from "@/lib/types";
//
export function SupervisorCard({ supervisor }: { supervisor: Supervisor }) {
  return (
    <Card className="rounded-xl shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex flex-col items-center space-y-2">
          <User className="h-8 w-8 text-yellow-300" />
          <CardTitle className="text-white text-2xl font-bold text-center">
            معلومات المشرف
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {supervisor.imageUrl && (
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={supervisor.imageUrl}
                alt={supervisor.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-100 shadow-md"
              />
            </div>
          )}

          <div className={`space-y-4 ${supervisor.imageUrl ? "md:w-2/3" : "w-full"}`}>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium block text-right">
                الاسم الكامل (عربي)
              </Label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-right">
                {supervisor.fullNameAr}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium block text-right">
                الاسم الكامل (إنجليزي)
              </Label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-left">
                {supervisor.fullNameEn}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium block text-right">
                البريد الإلكتروني
              </Label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-left">
                <a
                  href={`mailto:${supervisor.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {supervisor.email}
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium block text-right">
                حالة المشرف
              </Label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-right">
                {supervisor.isOutsider ? "خارجي" : "داخلي"}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium block text-right">
                تاريخ التسجيل
              </Label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-right">
                <CalendarDays className="w-4 h-4" />
                {new Date(supervisor.createdAt).toLocaleDateString("en-US")}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}