"use client";
import { Report } from "@/lib/types";
import { FileText, Plus, Download, NotebookPen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReportsAdminViewProps {
  reports: Report[];
  onAddNewReport: () => void;
  isLoading: boolean;
}

export default function ReportsAdminView({
  reports,
  onAddNewReport,
  isLoading,
}: ReportsAdminViewProps) {
  return (
    <Card className="rounded-xl shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex flex-col items-center space-y-2">
          <NotebookPen className="h-8 w-8 text-yellow-300" />
          <CardTitle className="text-white text-2xl font-bold text-center">
            إدارة التقارير الأكاديمية
          </CardTitle>
          <CardDescription className="text-blue-100 flex items-center gap-2">
            <span className="h-2 w-2 bg-yellow-300 rounded-full animate-pulse"></span>
            عدد التقارير: {reports.length}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <div className="flex justify-end mb-6">
          <Button
            onClick={onAddNewReport}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            <Plus className="w-5 h-5 mr-2" />
            تقرير جديد
          </Button>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">لا توجد تقارير متاحة</h3>
            <p className="mt-1 text-sm text-gray-500">
              ابدأ بإضافة تقرير جديد بالنقر على زر "تقرير جديد"
            </p>
          </div>
        ) : (
          <div className="overflow-hidden border border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider">
                    نوع التقرير
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider">
                    العنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.reportId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.type === "academic"
                              ? "bg-purple-100 text-purple-800"
                              : report.type === "research"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {report.type === "academic" && "أكاديمي"}
                          {report.type === "research" && "بحثي"}
                          {report.type === "progress" && "تقدم"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {report.attachmentUrl && (
                        <Button
                          variant="outline"
                          className="text-blue-600 hover:text-blue-800 border-blue-200"
                          asChild
                        >
                          <a href={report.attachmentUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-1" />
                            عرض التقرير
                          </a>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
