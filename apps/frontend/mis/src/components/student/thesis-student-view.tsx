"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ThesisResponse } from "@/lib/types";
import { FileText, Hash, FileDigit, Text, File, Download, CalendarDays } from "lucide-react";
interface ThesisStudentViewProps {
  thesis: ThesisResponse;
}

export function ThesisStudentView({ thesis }: ThesisStudentViewProps) {
  if (!thesis || !thesis.thesisId) {
    return (
      <Card className="max-w-3xl mx-auto my-8">
        <CardContent className="text-center py-8 text-gray-500">
          لا توجد بيانات متاحة للعرض
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[95%] sm:w-[90%] md:w-[85%] lg:max-w-2xl mx-auto my-4 sm:my-6 border border-blue-100 shadow-md sm:shadow-lg rounded-lg overflow-hidden bg-white">
      <CardHeader className="bg-blue-600 p-3 sm:p-4 md:p-5">
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-200" />
          معلومات الرسالة العلمية
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 p-3 sm:p-4 md:p-5 text-left">
        {[
          {
            icon: <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
            label: "رقم الرسالة",
            value: thesis.thesisId
          },
          {
            icon: <FileDigit className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
            label: "رقم الطلب",
            value: thesis.applicationId
          },
          {
            icon: <Text className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
            label: "عنوان الرسالة",
            value: thesis.title
          }
        ].map((item, index) => (
          <div key={index} className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              {item.icon}
              <p className="text-sm sm:text-base md:text-lg font-medium text-blue-700">{item.label}</p>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 border-b border-blue-100 pb-1 sm:pb-2 pt-1">
              {item.value}
            </p>
          </div>
        ))}

        {thesis.attachmentUrl && (
          <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <File className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <p className="text-sm sm:text-base md:text-lg font-medium text-blue-700">ملف الرسالة</p>
            </div>
            <Button
              asChild
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 sm:py-2 px-3 sm:px-4 md:px-5 rounded-md sm:rounded-lg transition-colors flex gap-1 sm:gap-2 items-center justify-center text-xs sm:text-sm md:text-base"
            >
              <a href={thesis.attachmentUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                عرض الملف المرفق
              </a>
            </Button>
          </div>
        )}
      </CardContent>

      <div className="bg-blue-50 p-2 sm:p-3 md:p-4 border-t border-blue-100">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600" />
          <p className="text-xs sm:text-sm md:text-md text-blue-800">
            تاريخ التقديم: {new Date(thesis.createdAt).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>
    </Card>
);
}
