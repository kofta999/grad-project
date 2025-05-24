"use client";
import Image from "next/image";
import {
  GraduationCap,
  Mail,
  Phone,
  IdCard,
  FileText,
  User,
  Briefcase,
  Calendar,
  Globe,
  Shield,
  Cake,
} from "lucide-react";
import { StudentType } from "@/lib/types";
import { Card, CardContent, CardGrid, CardHeader, CardTitle } from "../ui/card";
import { SpacingWrapper } from "../ui/spacing-wrapper";

export default function StudentDetails({ student }: { student: StudentType }) {
  return (
    <>
      {/* تفاصيل الطالب */}
      <Card>
        <CardHeader>
          <CardTitle>
            <GraduationCap className="text-yellow-500" /> تفاصيل الطالب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="flex items-center">
            <Image src={student.imageUrl} alt="student image" width={150} height={150} />
            <SpacingWrapper className="w-full mx-3">
              <h3 className="text-xl font-bold text-gray-800">اسم الطالب</h3>
              <p className="text-lg text-gray-700 mt-1">{student.fullNameAr}</p>
            </SpacingWrapper>
          </Card>
          <CardGrid>
            <SpacingWrapper>
              <p className="text-gray-600 flex">
                <span>
                  <Mail className="text-gray-600 ml-2" />
                </span>
                البريد الالكتروني
              </p>
              <p className="text-lg font-semibold text-gray-800">{student.email}</p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex">
                <span>
                  <Phone className="text-gray-600 ml-2" />
                </span>
                رقم الهاتف الرئيسي
              </p>
              <p className="text-lg font-semibold text-gray-800">{student.phoneNoMain}</p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex">
                <span>
                  <Phone className="text-gray-600 ml-2" />
                </span>
                رقم الهاتف الثانوي
              </p>
              <p className="text-lg font-semibold text-gray-800">{student.phoneNoSec}</p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex">
                <span>
                  <IdCard className="text-gray-600 ml-2" />
                </span>
                رقم الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">{student.idNumber}</p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <FileText className="text-gray-600 ml-2" />
                جهة إصدار الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.idAuthority || "غير متوفر"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <User className="text-gray-600 ml-2" />
                الحالة الاجتماعية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.martialStatus || "غير متوفر"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Briefcase className="text-gray-600 ml-2" />
                نوع الوظيفة
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.jobType || "غير متوفر"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Calendar className="text-gray-600 ml-2" />
                تاريخ إنشاء الحساب
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.createdAt
                  ? new Date(student.createdAt).toISOString().split("T")[0]
                  : "غير متوفر"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <User className="text-gray-600 ml-2" />
                الجنس
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.gender ? "ذكر" : "أنثى"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Globe className="text-gray-600 ml-2" />
                الجنسية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.nationality || "غير متوفر"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Phone className="text-gray-600 ml-2" />
                الفاكس
              </p>
              <p className="text-lg font-semibold text-gray-800">{student.fax || "غير متوفر"}</p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <IdCard className="text-gray-600 ml-2" />
                نوع الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">{student.idType || "غير متوفر"}</p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Calendar className="text-gray-600 ml-2" />
                تاريخ إصدار الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.idIssuanceDate
                  ? new Date(student.idIssuanceDate).toISOString().split("T")[0]
                  : "غير متوفر"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Shield className="text-gray-600 ml-2" />
                الحالة العسكرية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.militaryStatus || "غير متوفر"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Briefcase className="text-gray-600 ml-2" />
                حالة العمل
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.isWorking ? "يعمل" : "لا يعمل"}
              </p>
            </SpacingWrapper>
            <SpacingWrapper>
              <p className="text-gray-600 flex items-center">
                <Cake className="text-gray-600 ml-2" />
                تاريخ الميلاد
              </p>
              <p className="text-lg font-semibold text-gray-800">{student.dob || "غير متوفر"}</p>
            </SpacingWrapper>
          </CardGrid>
        </CardContent>
      </Card>
    </>
  );
}
