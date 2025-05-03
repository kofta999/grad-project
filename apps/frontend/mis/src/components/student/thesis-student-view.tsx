'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ThesisResponse } from "@/lib/types";
import { FileText, Hash, FileDigit, Text, File, Download, CalendarDays } from 'lucide-react';
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

  // return (
  //   <Card className="max-w-3xl mx-auto my-8">
  //     <CardHeader>
  //       <CardTitle className="text-2xl font-bold text-right">معلومات الرسالة</CardTitle>
  //     </CardHeader>
      
  //     <CardContent className="space-y-6 text-right">
  //       <div>
  //         <p className="font-medium text-gray-500">رقم الرسالة:</p>
  //         <p className="text-lg border-b pb-2">{thesis.thesisId}</p>
  //       </div>

  //       <div>
  //         <p className="font-medium text-gray-500">رقم الطلب:</p>
  //         <p className="text-lg border-b pb-2">{thesis.applicationId}</p>
  //       </div>

  //       <div>
  //         <p className="font-medium text-gray-500">عنوان الرسالة:</p>
  //         <p className="text-lg border-b pb-2">{thesis.title}</p>
  //       </div>

  //       {thesis.attachmentUrl && (
  //         <div className="pt-4">
  //           <p className="font-medium text-gray-500">ملف الرسالة:</p>
  //           <div className="flex justify-end mt-2">
  //             <Button asChild variant="outline">
  //               <a
  //                 href={thesis.attachmentUrl}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 className="flex items-center gap-2"
  //               >
  //                 عرض الملف المرفق
  //               </a>
  //             </Button>
  //           </div>
  //         </div>
  //       )}
  //     </CardContent>
  //   </Card>
  // );
  return (
  <Card className="max-w-3xl mx-auto my-8 border border-blue-100 shadow-lg">
    <CardHeader className="bg-blue-50 rounded-t-lg p-4">
      <CardTitle className="text-2xl font-bold text-right text-blue-800 flex items-center justify-end gap-2">
        <FileText className="w-6 h-6" />
        معلومات الرسالة العلمية
      </CardTitle>
    </CardHeader>
      
    <CardContent className="space-y-4 text-right p-6">
      <div className="bg-white p-4 rounded-lg border border-blue-50 shadow-sm">
        <p className="font-medium text-blue-600 mb-1 flex items-center justify-end gap-2">
          <Hash className="w-4 h-4" />
          رقم الرسالة:
        </p>
        <p className="text-lg text-gray-800 border-b border-blue-100 pb-2 pt-1">
          {thesis.thesisId}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-blue-50 shadow-sm">
        <p className="font-medium text-blue-600 mb-1 flex items-center justify-end gap-2">
          <FileDigit className="w-4 h-4" /> 
          رقم الطلب:
        </p>
        <p className="text-lg text-gray-800 border-b border-blue-100 pb-2 pt-1">
          {thesis.applicationId}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-blue-50 shadow-sm">
        <p className="font-medium text-blue-600 mb-1 flex items-center justify-end gap-2">
          <Text className="w-4 h-4" /> 
          عنوان الرسالة:
        </p>
        <p className="text-lg text-gray-800 border-b border-blue-100 pb-2 pt-1">
          {thesis.title}
        </p>
      </div>

      {thesis.attachmentUrl && (
        <div className="bg-white p-4 rounded-lg border border-blue-50 shadow-sm">
          <p className="font-medium text-blue-600 mb-3 flex items-center justify-end gap-2">
            <File className="w-4 h-4" /> 
            ملف الرسالة:
          </p>
          <div className="flex justify-end">
            <Button 
              asChild 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors flex gap-2"
            >
              <a
                href={thesis.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                عرض الملف المرفق
              </a>
            </Button>
          </div>
        </div>
      )}
    </CardContent>
    <div className="bg-blue-50 rounded-b-lg p-4 border-t border-blue-100 text-right">
      <p className="text-sm text-blue-700 flex items-center justify-end gap-2">
        <CalendarDays className="w-4 h-4" />
        تاريخ التقديم: {new Date().toLocaleDateString('ar-SA')}
      </p>
    </div>
  </Card>
);
}