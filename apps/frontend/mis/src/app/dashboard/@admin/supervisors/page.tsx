"use client";
import { SupervisorList } from "@/components/supervisor/supervisorList";

export default function SupervisorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-3">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">إدارة المشرفين</h1>
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <SupervisorList />
          </div>
        </div>
      </div>
    </div>
  );
}