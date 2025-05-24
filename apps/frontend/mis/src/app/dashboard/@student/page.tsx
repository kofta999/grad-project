"use client";
import Link from "next/link";
import ApplicationDetails from "@/components/application/application-details";
import { apiClient } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";
import { ApplicationType, STATUS } from "@/lib/types";
import { Container } from "@/components/ui/container";

export default function Page() {
  const [application, setApplication] = useState<ApplicationType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getApplicationData = async () => {
    try {
      const res = await apiClient.students.me.applications.$get();
      if (res.status === 200) {
        const data = await res.json();
        setApplication(data.application);
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApplicationData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-20 h-20" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto p-8 flex justify-center items-center flex-col gap-20">
        <h1 className="text-3xl">لم يتم التقديم هذا العام</h1>
        <Link href="/dashboard/applications">
          <Button className="text-xl px-8 py-6 bg-blue-600 hover:bg-blue-700">ابدأ تقديمك</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <Container>
        <div className="relative flex justify-center items-center">
          <h1 className="text-3xl font-bold text-center text-blue-600 mt-8">
            بيانات التقديم ({STATUS[application.status]})
          </h1>
        </div>
        <ApplicationDetails application={application} />
      </Container>
    </div>
  );
}
