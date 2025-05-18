"use client";
import {
  GraduationCap,
  School,
  User,
  Home,
  Phone,
  Info,
  File,
  FileText,
  MapPin,
  Mail,
} from "lucide-react";
import { ApplicationType } from "@/lib/types";
import { Card, CardContent, CardGrid, CardHeader, CardTitle } from "../ui/card";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import Link from "next/link";

export default function ApplicationDetails({ application }: { application: ApplicationType }) {
  if (!application) {
    return <div className="text-2xl font-bold text-blue-900 mb-4">لا يوجد بيانات للطلب</div>;
  }

  return (
    <>
      {/* نظرة عامة */}
      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle className="flex items-center mb-3">
              <GraduationCap className="ml-2" /> نظرة عامة
            </CardTitle>
          </CardHeader>
          <CardGrid>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">العام الأكاديمي للتسجيل</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.registration?.academicYear}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">حالة الطلب</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.isAccepted ? "مقبول" : "قيد المراجعة"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">الكلية</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.registration?.faculty}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">البرنامج العلمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.registration?.academicProgram}
              </p>
            </SpacingWrapper>
          </CardGrid>
        </CardContent>
      </Card>

      {/* المعلومات الأكاديمية */}
      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle className="flex items-center mb-3">
              <School className="ml-2" /> المعلومات الأكاديمية
            </CardTitle>
          </CardHeader>
          <CardGrid>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">المؤهل</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.qualification}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">الجامعة</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.university}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">الكلية</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.faculty}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">التخصص</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.specialization}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">سنة النخرج</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.year}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">المعدل التراكمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.gpa}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">التقدير الأكاديمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.grade}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">الدولة</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.academicQualification?.country}
              </p>
            </SpacingWrapper>
          </CardGrid>
        </CardContent>
      </Card>

      {/* المعلومات الشخصية */}
      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle className="flex items-center mb-3">
              <Info className="ml-2" /> المعلومات الشخصية
            </CardTitle>
          </CardHeader>
          <CardGrid>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4 flex items-center">العنوان</p>
              {application?.addresses?.map((address, index) => (
                <p key={index} className="text-lg font-semibold text-gray-800 flex items-center">
                  <Home className="ml-2" />
                  {`${address.fullAddress}, ${address.city}, ${address.country}${address.type ? ` (${address.type})` : ""}`}
                </p>
              ))}
            </SpacingWrapper>
            {application.emergencyContact && (
              <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-4 flex items-center">
                  معلومات الاتصال في حالات الطوارئ
                </p>
                <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <User className="ml-2" />
                  {application?.emergencyContact?.name}
                </p>
                <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Phone className="ml-2" />
                  {application?.emergencyContact?.phoneNumber}
                </p>
                <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Mail className="ml-2" />
                  {application?.emergencyContact?.email || "غير متوفر"}
                </p>
                <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPin className="ml-2" />
                  {application?.emergencyContact?.address || "غير متوفر"}
                </p>
              </SpacingWrapper>
            )}
          </CardGrid>
        </CardContent>
      </Card>

      {/* المستندات المرفوعة */}
      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle className="flex items-center mb-3">
              <FileText className="ml-2" /> المستندات المرفوعة
            </CardTitle>
          </CardHeader>
          <CardGrid className="md:grid-cols-1">
            {application?.attachments?.map((attachment, index) => (
              <SpacingWrapper
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <p className="text-gray-800 flex items-center">
                  <File className="ml-2" />
                  {attachment.type}
                </p>
                <Link
                  className="text-gray-800 rounded-md border border-gray-400 px-5 pb-1"
                  href={attachment.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  عرض
                </Link>
              </SpacingWrapper>
            ))}
          </CardGrid>
        </CardContent>
      </Card>
    </>
  );
}
