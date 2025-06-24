"use client";
import { Card, CardHeader, CardTitle, CardContent, CardGrid } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ThesisResponse } from "@/lib/types";
import { FileText, Text, File, Download, CalendarDays, User, Mail } from "lucide-react";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import Link from "next/link";

interface ThesisStudentViewProps {
  thesis: ThesisResponse;
}

const SUPERVISORS = [
  { id: 1, name: "د/ مروة جمال", email: "Marwa_Gamal@eng.suez.edu.eg" },
  { id: 2, name: "د/ هدير حسين", email: "hadeerhussein@eng.suez.edu.eg" },
  { id: 3, name: "د/ ريهام حسن", email: "Reham.Elenani@eng.suez.edu.eg" },
  { id: 4, name: "د/ إيمان مصطفى", email: "IMAN.MOSTAFA@ENG.SUEZ.EDU.EG" },
];

export function ThesisStudentView({ thesis }: ThesisStudentViewProps) {
  if (!thesis || !thesis.thesisId) {
    return (
      <Card>
        <CardContent className="text-center py-8 text-blue-600">
        لم يتم تقديم رسالة علمية بعد
        </CardContent>
      </Card>
    );
  }

  const supervisor = SUPERVISORS.find(s => s.id === thesis.supervisor.supervisorId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-yellow-200" />
          معلومات الرسالة العلمية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardGrid className="md:grid-cols-1">
          <SpacingWrapper>
            <p className="text-gray-600 flex items-center gap-2">
              <Text className="w-4 h-4" />
              عنوان الرسالة
            </p>
            <p className="text-lg font-semibold text-gray-800">{thesis.title}</p>
          </SpacingWrapper>

          {supervisor && (
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                المشرف الأكاديمي
              </p>
              <div className="mt-2 space-y-2">
                <p className="font-medium text-gray-800">{supervisor.name}</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {supervisor.email}
                </p>
              </div>
            </SpacingWrapper>
          )}

          {thesis.attachmentUrl && (
            <SpacingWrapper>
              <div className="flex items-center gap-2 mb-3">
                <File className="w-4 h-4" />
                <p className="text-gray-600">ملف الرسالة</p>
              </div>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={thesis.attachmentUrl} target="_blank">
                  <Download className="w-4 h-4 mr-2" />
                  عرض الملف المرفق
                </Link>
              </Button>
            </SpacingWrapper>
          )}
        </CardGrid>
      </CardContent>

      <div className="bg-blue-50 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          <p className="text-gray-600">
            تاريخ التقديم: {new Date(thesis.createdAt).toLocaleDateString("en-US")}
          </p>
        </div>
      </div>
    </Card>
  );
}