"use client";
import { GraduationCap, School, User, Home, Phone, IdCard, Info, File, FileText, MapPin, Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/client';

interface Address {
  fullAddress: string;
  country: string;
  city: string;
  type: "permanent" | "current";
}

interface AcademicQualification {
  qualification: string;
  university: string;
  faculty: string;
  specialization: string;
  year: string;
  gpa: number;
  grade: string;
  country: string;
}

interface EmergencyContact {
  name: string;
  phoneNumber: string;
  email?: string | null;
  address?: string | null;
}

interface Registration {
  academicYearId: number;
  faculty: string;
  academicDegree: string;
  departmentId: number;
}

interface Attachment {
  type: string;
  attachmentUrl: string;
}

interface Student {
  applicationId: number;
  isAccepted: boolean;
  addresses: Address[];
  academicQualification: AcademicQualification;
  emergencyContact: EmergencyContact;
  registration: Registration;
  attachments: Attachment[];
}

interface ApiResponse {
  application: Student;
}
export default function StudentInfo() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const params = useParams();
  // const { id } = params as { id: string };

  useEffect(() => {
    // if (!id) return;

    const fetchData = async () => {
    try {
      const response = await apiClient.student.applications.$get();
      const data = await response.json() as ApiResponse; 
      setStudent(data.application); 
      } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('حدث خطأ غير متوقع');
      }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!student) {
    return <div>لا توجد بيانات للطالب.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir='rtl'>
      <div className="max-w-4xl mx-auto p-8">
        <div className='relative flex justify-center items-center'>
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">بيانات التقديم</h1>
          {/* <div className="rounded-md border border-gray-400 px-6 py-0.5 absolute top-0 left-0">
            <a className="text-gray-800" href="">قدم طلبك الان</a>
          </div> */}
        </div>

        {/* نظرة عامة */}
        <div className="mb-2 py-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <GraduationCap className="ml-2" /> نظرة عامة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow-lg">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">العام الأكاديمي للتسجيل</p>
              <p className="text-lg font-semibold text-gray-800">{student?.registration?.academicYearId}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">حالة الطلب</p>
              <p className="text-lg font-semibold text-gray-800">{student?.isAccepted ? 'مقبول' : 'قيد المراجعة'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الدرجة العلمية</p>
              <p className="text-lg font-semibold text-gray-800">{student?.registration?.academicDegree}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">البرنامج العلمي</p>
              <p className="text-lg font-semibold text-gray-800">{student?.registration?.faculty}</p>
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
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.qualification}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الجامعة</p>
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.university}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الكلية</p>
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.faculty}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">التخصص</p>
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.specialization}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">سنة النخرج</p>
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.year}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">المعدل التراكمي</p>
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.gpa}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">التقدير الأكاديمي</p>
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.grade}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">الدولة</p>
              <p className="text-lg font-semibold text-gray-800">{student?.academicQualification?.country}</p>
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
              {student?.addresses?.map((address, index) => (
                <p key={index} className="text-lg font-semibold text-gray-800 flex items-center">
                  <Home className='ml-2' />{address.fullAddress}, {address.city}, {address.country} ({address.type})
                </p>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-gray-600 mb-4 flex items-center">معلومات الاتصال في حالات الطوارئ</h2>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <User className='ml-2' />{student?.emergencyContact?.name}</p>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Phone className='ml-2' />{student?.emergencyContact?.phoneNumber}</p>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Mail className='ml-2' />{student?.emergencyContact?.email || 'غير متوفر'}</p>
              <p className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <MapPin className='ml-2' />{student?.emergencyContact?.address || 'غير متوفر'}</p>
            </div>
          </div>
        </div>

        {/* المستندات المرفوعة */}
        <div className="mb-2 py-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FileText className="ml-2" /> المستندات المرفوعة
          </h2>
          <div className="grid grid-cols-1 gap-4 bg-white rounded-lg shadow-lg">
            {student?.attachments?.map((attachment, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                <h2 className="text-gray-800 mb-4 flex items-center">
                  <File className='ml-2' />{attachment.type}</h2>
                <div className='rounded-md border border-gray-400 px-5 pb-1'>
                  <a className="text-gray-800" href={attachment.attachmentUrl} target="_blank" rel="noopener noreferrer">عرض</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}