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
import { ApplicationType, STATUS } from "@/lib/types";
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
        <CardHeader>
          <CardTitle>
            <GraduationCap className="w-5 h-5 text-yellow-200" /> نظرة عامة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardGrid>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">العام الأكاديمي للتسجيل</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.registration?.academicYear}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">حالة الطلب</p>
              <p className="text-lg font-semibold text-gray-800">{STATUS[application.status]}</p>
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
        <CardHeader>
          <CardTitle>
            <School className="w-5 h-5 text-yellow-200" /> المعلومات الأكاديمية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardGrid>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">المؤهل</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.qualification}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">الجامعة</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.university}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">الكلية</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.faculty}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">التخصص</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.specialization}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">سنة النخرج</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.year}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">المعدل التراكمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.gpa}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">التقدير الأكاديمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.grade}
              </p>
            </SpacingWrapper>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600">الدولة</p>
              <p className="text-lg font-semibold text-gray-800">
                {application?.qualification?.country}
              </p>
            </SpacingWrapper>
          </CardGrid>
        </CardContent>
      </Card>

      {/* المعلومات الشخصية */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Info className="w-5 h-5 text-yellow-200" /> المعلومات الشخصية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardGrid>
            <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">العنوان</p>
              {application?.addresses?.map((address, index) => (
                <p key={index} className="text-lg font-semibold text-gray-800 flex items-center">
                  <Home className="ml-2" />
                  {`${address.fullAddress}, ${address.city}, ${address.country}${address.type ? ` (${address.type})` : ""}`}
                </p>
              ))}
            </SpacingWrapper>
            {application.emergencyContact && (
              <SpacingWrapper className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-gray-600 flex items-center">معلومات الاتصال في حالات الطوارئ</p>
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
        <CardHeader>
          <CardTitle>
            <FileText className="w-5 h-5 text-yellow-200" /> المستندات المرفوعة
          </CardTitle>
        </CardHeader>
        <CardContent>
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
