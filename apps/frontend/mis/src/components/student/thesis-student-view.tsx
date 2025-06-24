"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardGrid, CardHeader, CardTitle } from "@/components/ui/card";
import type { ThesisResponse } from "@/lib/types";
import { CalendarDays, Download, File, FileText, Mail, Text, User } from "lucide-react";
import Link from "next/link";
import { SpacingWrapper } from "../ui/spacing-wrapper";

interface ThesisStudentViewProps {
  thesis: ThesisResponse;
}

export function ThesisStudentView({ thesis }: ThesisStudentViewProps) {
  const { supervisor } = thesis;

  if (!thesis || !thesis.thesisId) {
    return (
      <Card>
        <CardContent className="text-center py-8 text-blue-600">
          لم يتم تقديم رسالة علمية بعد
        </CardContent>
      </Card>
    );
  }

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
