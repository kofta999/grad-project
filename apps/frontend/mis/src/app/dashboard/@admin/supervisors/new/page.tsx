"use client";
import { SupervisorForm } from "@/components/supervisor/supervisorForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NewSupervisorPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/dashboard/supervisors");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mb-8">
            <Link href="/dashboard/supervisors">
              <Button className="text-white bg-blue-600 hover:bg-blue-700 ">العودة للقائمة</Button>
            </Link>
          </div>
          <SupervisorForm
            onCancel={() => router.push("/dashboard/supervisors")}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
