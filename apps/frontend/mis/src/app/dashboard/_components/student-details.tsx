import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";
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

type Student = Required<
  InferResponseType<(typeof apiClient.admin.applications)[":id"]["$get"], 200>
>["student"];

export default function StudentDetails({ student }: { student: Student }) {
  return (
    <>
      {/* تفاصيل الطالب */}
      <div className="mb-2 py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <GraduationCap className="mr-2" /> تفاصيل الطالب
        </h2>
        <div className="bg-white p-3 shadow-lg">
          <div className="flex flex-row items-center justify-center p-2">
            <div className="w-20 h-20 rounded-full overflow-hidden ml-6 border-2 border-gray-300">
              <Image
                src="/avatar.jpg"
                // src={student.imageUrl}
                alt=""
                width={200}
                height={200}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">اسم الطالب</h3>
              <p className="text-md text-gray-700 mt-1">{student.fullNameAr}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Mail className="text-gray-600 ml-2" />
                البريد الالكتروني
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.email}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Phone className="text-gray-600 ml-2" />
                رقم الهاتف الرئيسي
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.phoneNoMain || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Phone className="text-gray-600 ml-2" />
                رقم الهاتف الثانوي
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.phoneNoSec || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <IdCard className="text-gray-600 ml-2" />
                رقم الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.idNumber || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <FileText className="text-gray-600 ml-2" />
                جهة إصدار الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.idAuthority || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <User className="text-gray-600 ml-2" />
                الحالة الاجتماعية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.martialStatus || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Briefcase className="text-gray-600 ml-2" />
                نوع الوظيفة
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.jobType || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Calendar className="text-gray-600 ml-2" />
                تاريخ إنشاء الحساب
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.createdAt || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <User className="text-gray-600 ml-2" />
                الجنس
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.gender ? "ذكر" : "أنثى"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Globe className="text-gray-600 ml-2" />
                الجنسية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.nationality || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Phone className="text-gray-600 ml-2" />
                الفاكس
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.fax || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <IdCard className="text-gray-600 ml-2" />
                نوع الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.idType || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Calendar className="text-gray-600 ml-2" />
                تاريخ إصدار الهوية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.idIssuanceDate || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Shield className="text-gray-600 ml-2" />
                الحالة العسكرية
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.militaryStatus || "غير متوفر"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Briefcase className="text-gray-600 ml-2" />
                حالة العمل
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.isWorking ? "يعمل" : "لا يعمل"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 flex items-center">
                <Cake className="text-gray-600 ml-2" />
                تاريخ الميلاد
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {student.dob || "غير متوفر"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
