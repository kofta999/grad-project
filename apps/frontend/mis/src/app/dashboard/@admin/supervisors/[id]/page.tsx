"use client";
import { SupervisorCard } from "@/components/supervisor/supervisorCard";
import { apiClient } from "@/lib/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Supervisor } from "@/lib/types";

export default function SupervisorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [supervisor, setSupervisor] = useState<Supervisor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.supervisors[":id"].$get({
          param: { id: params.id as string },
        });

        if (!response.ok) throw new Error("Failed to fetch supervisor");

        const data = await response.json();

        const formattedSupervisor: Supervisor = {
          supervisorId: data.supervisorId,
          fullNameAr: data.fullNameAr,
          fullNameEn: data.fullNameEn,
          email: data.email,
          imageUrl: data.imageUrl,
          isOutsider: data.isOutsider ?? null,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };

        setSupervisor(formattedSupervisor);
      } catch (error) {
        toast.error("فشل في تحميل بيانات المشرف");
        router.push("/dashboard/supervisors");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center py-8">
          <p>جاري تحميل بيانات المشرف...</p>
        </div>
      </div>
    );
  }

  if (!supervisor) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center py-8">
          <p>لم يتم العثور على المشرف</p>
          <Link href="/supervisors">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              العودة للقائمة
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard/supervisors" className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">العودة للقائمة</Button>
        </Link>
        <SupervisorCard supervisor={supervisor} />
      </div>
    </div>
  );
}
