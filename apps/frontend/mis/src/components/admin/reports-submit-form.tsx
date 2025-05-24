"use client";
import { useState, ChangeEvent } from "react";
import { UploadCloud, CheckCircle2, Loader2, BookmarkCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { apiClient } from "@/lib/client";

const ACCEPTED_FILE_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ReportsSubmitFormProps {
  onSubmit: (reportData: { type: string; title: string; attachmentUrl: string }) => void;
  isLoading: boolean;
  onCancel?: () => void;
}

export default function ReportsSubmitForm({
  onSubmit,
  isLoading,
  onCancel,
}: ReportsSubmitFormProps) {
  const [formValues, setFormValues] = useState({
    type: "",
    title: "",
    attachmentUrl: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<void> => {
    setIsUploading(true);
    const toastId = toast.loading("جاري رفع الملف...");

    try {
      const uploadResponse = await apiClient.auth.upload.$post({
        form: { file },
      });

      if (!uploadResponse.ok) {
        throw new Error("فشل في رفع الملف");
      }

      const { uploadUrl } = await uploadResponse.json();
      setFormValues((prev) => ({ ...prev, attachmentUrl: uploadUrl }));
      toast.success("تم رفع الملف بنجاح", { id: toastId });
    } catch (error) {
      toast.error("فشل في رفع الملف", { id: toastId });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error("يجب أن يكون الملف من نوع PDF");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("يجب أن يكون حجم الملف أقل من 5 ميجابايت");
      return;
    }

    await uploadFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.type || !formValues.title || !formValues.attachmentUrl) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }
    onSubmit(formValues);
  };

  return (
    <Card className="rounded-xl shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex flex-col items-center space-y-2">
          <BookmarkCheck className="h-8 w-8 text-yellow-300" />
          <CardTitle className="text-white text-2xl font-bold text-center">
            تقديم التقرير الأكاديمي
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="type" className="text-gray-700 font-medium block text-right">
              نوع التقرير <span className="text-yellow-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setFormValues({ ...formValues, type: value })}
              value={formValues.type}
              required
            >
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right">
                <SelectValue placeholder="اختر نوع التقرير" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic">تقرير أكاديمي</SelectItem>
                <SelectItem value="research">تقرير بحثي</SelectItem>
                <SelectItem value="progress">تقرير تقدم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="title" className="text-gray-700 font-medium block text-right">
              عنوان التقرير <span className="text-yellow-500">*</span>
            </Label>
            <Input
              id="title"
              value={formValues.title}
              onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              placeholder="أدخل عنوان التقرير"
              required
              minLength={1}
              maxLength={200}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium block text-right">
              ملف التقرير (PDF) <span className="text-yellow-500">*</span>
            </Label>

            <label
              htmlFor="attachment"
              className={`relative cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 hover:border-blue-500 transition-colors ${
                formValues.attachmentUrl
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {formValues.attachmentUrl ? (
                  <>
                    <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
                    <p className="font-medium text-green-600">✓ تم اختيار الملف</p>
                    <p className="text-sm text-gray-600 mt-1 truncate max-w-xs">
                      {formValues.attachmentUrl.split("/").pop()}
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-10 w-10 text-blue-500 mb-3" />
                    <p className="font-medium text-gray-600">اضغط لرفع الملف أو اسحبه هنا</p>
                    {isUploading && <Loader2 className="h-5 w-5 animate-spin text-blue-500 mt-2" />}
                  </>
                )}
              </div>
              <input
                id="attachment"
                type="file"
                accept=".pdf,application/pdf"
                className="sr-only"
                onChange={handleFileChange}
                required
              />
            </label>
            <p className="text-xs text-gray-500 text-right mt-1">
              الحد الأقصى لحجم الملف: 5 ميجابايت - PDF فقط
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            {onCancel && (
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                disabled={isLoading || isUploading}
              >
                إلغاء
              </Button>
            )}
            <Button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
              disabled={
                isLoading ||
                isUploading ||
                !formValues.type ||
                !formValues.title ||
                !formValues.attachmentUrl
              }
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري التقديم...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">تقديم التقرير</span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
