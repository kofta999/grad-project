"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/client";
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { BookmarkCheck, UploadCloud, CheckCircle2, Loader2, Send } from "lucide-react";
import type { SubmitThesisRequest, SubmitThesisResponse, ThesisResponse } from "@/lib/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

interface ThesisSubmitFormProps {
  onSubmissionSuccess?: (response: ThesisResponse) => void;
}

export function ThesisSubmitForm({ onSubmissionSuccess }: ThesisSubmitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formValues, setFormValues] = useState<SubmitThesisRequest>({
    title: "",
    attachmentUrl: "",
  });

  const validateForm = (): boolean => {
    if (!formValues.title.trim()) {
      toast.error("عنوان الرسالة مطلوب");
      return false;
    }

    if (!formValues.attachmentUrl) {
      toast.error("يرجى رفع ملف الرسالة");
      return false;
    }

    return true;
  };

  const submitForm = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("جاري تقديم الرسالة...");

    try {
      const response = await apiClient.students.me.thesis.$post({
        json: formValues,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في تقديم الرسالة");
      }

      // Here the create endpoint returns {} instead of the created thesis
      // So we need to either refresh the page or query the api for the thesis
      const result = await response.json();
      toast.success("تم تقديم الرسالة بنجاح", { id: toastId });
      setFormValues({ title: "", attachmentUrl: "" });

      onSubmissionSuccess?.(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      toast.error(errorMessage, { id: toastId });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormValues({ ...formValues, title: e.target.value });
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="rounded-xl shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex flex-col items-center space-y-2">
            <BookmarkCheck className="h-8 w-8 text-yellow-300" />
            <CardTitle className="text-white text-2xl font-bold text-center">
              تقديم الرسالة الأكاديمية
            </CardTitle>
            <CardDescription className="text-blue-100 flex items-center gap-2">
              <span className="h-2 w-2 bg-yellow-300 rounded-full animate-pulse"></span>
              التقديم متاح الآن
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-gray-700 font-medium block text-right">
                عنوان الرسالة <span className="text-yellow-500">*</span>
              </Label>
              <Input
                id="title"
                value={formValues.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="أدخل العنوان الكامل للرسالة"
                required
                minLength={1}
                maxLength={200}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium block text-right">
                ملف الرسالة (PDF) <span className="text-yellow-500">*</span>
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
                      {isUploading && (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500 mt-2" />
                      )}
                    </>
                  )}
                </div>
                <input
                  id="attachment"
                  type="file"
                  accept=".pdf,application/pdf"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-xs text-gray-500 text-right mt-1">
                الحد الأقصى لحجم الملف: 5 ميجابايت - PDF فقط
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={submitForm}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
                disabled={
                  isSubmitting || isUploading || !formValues.title || !formValues.attachmentUrl
                }
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    جاري التقديم...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    تقديم الرسالة
                  </span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
