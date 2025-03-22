"use client";
import {
  GraduationCap,
  School,
  User,
  Home,
  Phone,
  IdCard,
  Info,
  File,
  FileText,
  MapPin,
  Mail,
  User2,
  Globe,
  Calendar,
  Shield,
  Briefcase,
  Cake,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";

type Student = InferResponseType<
  (typeof apiClient.admin.applications)[":id"]["$get"],
  200
>["student"];

type Application = InferResponseType<
  (typeof apiClient.admin.applications)[":id"]["$get"],
  200
>["application"];

interface ApiResponse {
  student: Student;
  application: Application;
}

export default function AdminPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params as { id: string | undefined };

  const fetchData = async (id: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.admin.applications[":id"].$get({
        param: { id },
        query: {},
      });
      if (response.status === 200) {
        // I'm sure it'll return both student and application
        const data = (await response.json()) as ApiResponse;
        return data;
      } else {
        throw new Error("التقديم غير موجود");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error.message);
        throw new Error(`حدث خطأ: ${error.message}`);
      } else {
        console.error("حدث خطأ غير متوقع:", error);
        throw new Error("حدث خطأ غير متوقع أثناء جلب البيانات.");
      }
    }
  };

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        if (!id) {
          console.error("لم يتم تقديم معرف الطالب.");
          setLoading(false);
          return;
        }

        setLoading(true);
        const data: ApiResponse = await fetchData(id);
        console.log("البيانات المسترجعة:", data);
        setStudent(data.student);
        setApplication(data.application);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error(error.message);
        } else {
          setError("حدث خطأ غير متوقع");
          console.error("حدث خطأ غير متوقع:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndSetState();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (
    !student ||
    !application ||
    !application.addresses ||
    !application.attachments
  ) {
    return <div>لا توجد بيانات للطالب.</div>;
  }
  // if (!student || !application) {
  //   return <div>لا توجد بيانات للطالب.</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto p-8">
        <div className="relative flex justify-center items-center">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
            بيانات التقديم
          </h1>
        </div>

        {/* تفاصيل الطالب */}
        <div className="mb-2 py-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <GraduationCap className="ml-2" /> تفاصيل الطالب
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow-lg">
            <div className="flex space-x-3">
              <Image
                src={student.imageUrl}
                alt="صورة الطالب"
                className="rounded-full"
                width={120}
                height={120}
              />
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  اسم الطالب
                </h3>
                <p className="text-lg text-gray-800 mb-4">
                  {student.fullNameAr}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <p className="text-gray-600">
                  <Mail className="text-gray-600 mr-2" />
                  البريد الالكتروني
                </p>
                <p className="text-gray-800">{student.email}</p>
              </div>
              <div className="flex items-center">
                <p>
                  <Phone className="text-gray-600 mr-2" />
                  رقم الهاتف الرئيسي
                </p>
                <p className="text-gray-800">
                  {student.phoneNoMain || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <Phone className="text-gray-600 mr-2" />
                  رقم الهاتف الثانوي
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.phoneNoSec || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <IdCard className="text-gray-600 mr-2" />
                  رقم الهوية
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.idNumber || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <FileText className="text-gray-600 mr-2" />
                  جهة إصدار الهوية
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.idAuthority || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <User className="text-gray-600" />
                  الحالة الاجتماعية
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.martialStatus || "غير متوفر"}
                </p>
              </div>
              <div className="flex items-center">
                <p>
                  <Briefcase className="text-gray-600 mr-2" />
                </p>
                <p className="text-gray-800">
                  نوع الوظيفة: {student.jobType || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <Calendar className="text-gray-600" />
                  تاريخ إنشاء الحساب
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.createdAt || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <User className="text-gray-600" />
                  الجنس
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.gender ? "ذكر" : "أنثى"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <Globe className="text-gray-600" />
                  الجنسية
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.nationality || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <Phone className="text-gray-600" />
                  الفاكس
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.fax || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <IdCard className="text-gray-600" />
                  نوع الهوية
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.idType || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <Calendar className="text-gray-600" />
                  تاريخ إصدار الهوية
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.idIssuanceDate || "غير متوفر"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <Shield className="text-gray-600" />
                  الحالة العسكرية
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.militaryStatus || "غير متوفر"}
                </p>
              </div>
              <div className="flex items-center">
                <p>
                  <Briefcase className="text-gray-600 mr-2" />
                  حالة العمل
                </p>
                <p className="text-gray-800">
                  {student.isWorking ? "يعمل" : "لا يعمل"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>
                  <Cake className="text-gray-600" />
                  تاريخ الميلاد
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.dob || "غير متوفر"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* نظرة عامة */}
        <div className="mb-2 py-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <GraduationCap className="ml-2" /> نظرة عامة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow-lg">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">العام الأكاديمي للتسجيل</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.registration.academicYearId}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">حالة الطلب</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.isAccepted ? "مقبول" : "قيد المراجعة"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الدرجة العلمية</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.registration.academicDegree}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">البرنامج العلمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.registration.faculty}
              </p>
            </div>
          </div>
        </div>

        {/* المعلومات الأكاديمية */}
        <div className="mb-2 py-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <School className="ml-2" /> المعلومات الأكاديمية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow-lg">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">المؤهل</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.qualification}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الجامعة</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.university}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الكلية</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.faculty}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">التخصص</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.specialization}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">سنة النخرج</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.year}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">المعدل التراكمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.gpa}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">التقدير الأكاديمي</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.grade}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الدولة</p>
              <p className="text-lg font-semibold text-gray-800">
                {application.academicQualification.country}
              </p>
            </div>
          </div>
        </div>

        {/* المعلومات الشخصية */}
        <div className="mb-2 py-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Info className="ml-2" /> المعلومات الشخصية
          </h2>
          <div className="grid grid-cols-1 gap-4 bg-white rounded-lg shadow-lg">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-gray-600 mb-4 flex items-center">العنوان</h2>
              {application.addresses.map((address, index) => (
                <p
                  key={index}
                  className="text-lg font-semibold text-gray-800 flex items-center"
                >
                  <Home className="ml-2" />
                  {address.fullAddress}, {address.city}, {address.country} (
                  {address.type})
                </p>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-gray-600 mb-4 flex items-center">
                معلومات الاتصال في حالات الطوارئ
              </h2>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <User className="ml-2" />
                {application.emergencyContact.name}
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Phone className="ml-2" />
                {application.emergencyContact.phoneNumber}
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Mail className="ml-2" />
                {application.emergencyContact.email || "غير متوفر"}
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <MapPin className="ml-2" />
                {application.emergencyContact.address || "غير متوفر"}
              </p>
            </div>
          </div>
        </div>

        {/* المستندات المرفوعة */}
        <div className="mb-2 py-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FileText className="ml-2" /> المستندات المرفوعة
          </h2>
          <div className="grid grid-cols-1 gap-4 bg-white rounded-lg shadow-lg">
            {application.attachments.map((attachment, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <h2 className="text-gray-800 mb-4 flex items-center">
                  <File className="ml-2" />
                  {attachment.type}
                </h2>
                <div className="rounded-md border border-gray-400 px-5 pb-1">
                  <a
                    className="text-gray-800"
                    href={attachment.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    عرض
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
