"use client";
import { Loader2, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import Link from "next/link";

interface SupervisorListItem {
  supervisorId: number;
  name: string;
  fullNameAr?: string;
  fullNameEn?: string;
}

export function SupervisorList() {
  const [supervisors, setSupervisors] = useState<SupervisorListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.supervisors.$get({ query: { type: "" } });
        if (!response.ok) throw new Error("Failed to fetch supervisors");
        const data: SupervisorListItem[] = await response.json();
        setSupervisors(data);
      } catch (error) {
        toast.error("فشل في تحميل قائمة المشرفين");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="w-full bg-gray-200 p-6 rounded-xl shadow-lg border border-blue-100">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-800">قائمة المشرفين</h2>
        <Link href="/dashboard/supervisors/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            إضافة مشرف
          </Button>
        </Link>
      </div>

      <ul className="space-y-3">
        {supervisors.map((supervisor) => (
          <li key={supervisor.supervisorId}>
            <Link 
              href={`/dashboard/supervisors/${supervisor.supervisorId}`}
              className="w-full text-right p-3 rounded-lg hover:bg-blue-200 text-gray-700 transition block"
            >
              {supervisor.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}