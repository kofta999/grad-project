"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/client";
import ReportsSubmitForm from "@/components/admin/reports-submit-form";
import ReportsAdminView from "@/components/admin/reports-admin-view";
import { Report } from "@/lib/types";
import { toast } from "react-hot-toast";
import { Container } from "@/components/ui/container";
import { Loader } from "@/components/ui/loader";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.reports.$get({
        query: { type: "" },
      });

      if (!response.ok) throw new Error("Failed to fetch reports");

      const data = await response.json();
      setReports(data || []);
      setShowForm(!data || data.length === 0);
    } catch (err) {
      toast.error("فشل في تحميل التقارير. يرجى المحاولة مرة أخرى.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleAddReport = async (reportData: {
    type: string;
    title: string;
    attachmentUrl: string;
  }) => {
    setIsLoading(true);
    const toastId = toast.loading("جاري إضافة التقرير...");
    try {
      const response = await apiClient.reports.$post({
        json: reportData,
      });

      if (!response.ok) throw new Error("Failed to submit report");

      toast.success("تم إضافة التقرير بنجاح", { id: toastId });
      await fetchReports();
    } catch (err) {
      toast.error("فشل في إضافة التقرير", { id: toastId });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && reports.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-20 h-20" />
      </div>
    );
  }

  return (
    <Container>
      {showForm ? (
        <ReportsSubmitForm
          onSubmit={handleAddReport}
          isLoading={isLoading}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <ReportsAdminView
          reports={reports}
          onAddNewReport={() => setShowForm(true)}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
}
