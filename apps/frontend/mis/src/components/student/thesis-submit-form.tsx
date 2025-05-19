"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardGrid,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/client";
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { BookmarkCheck, UploadCloud, CheckCircle2, Loader2, Send } from "lucide-react";
import type { SubmitThesisRequest, SubmitThesisResponse, ThesisResponse } from "@/lib/types";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";
import { Loader } from "@/components/ui/loader";

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
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <SpacingWrapper className="flex flex-col items-center">
          <BookmarkCheck className="h-8 w-8 text-yellow-300" />
          <CardTitle className="text-white text-2xl font-bold text-center">
            تقديم الرسالة الأكاديمية
          </CardTitle>
          <CardDescription className="text-blue-100 flex items-center gap-2 text-center">
            <span className="h-2 w-2 bg-yellow-300 rounded-full animate-pulse"></span>
            التقديم متاح الآن
          </CardDescription>
        </SpacingWrapper>
      </CardHeader>

      <CardContent>
        <CardGrid className="md:grid-cols-1">
          <SpacingWrapper>
            <Label htmlFor="title">
              عنوان الرسالة <span className="text-yellow-500">*</span>
            </Label>
            <Input
              id="title"
              value={formValues.title}
              onChange={handleTitleChange}
              placeholder="أدخل العنوان الكامل للرسالة"
              required
              minLength={1}
              maxLength={200}
            />
          </SpacingWrapper>

          <SpacingWrapper>
            <Label>
              ملف الرسالة (PDF) <span className="text-yellow-500">*</span>
            </Label>

            <Label
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
                    <p className="font-medium text-gray-600">اضغط لرفع الملف</p>
                    {isUploading && <Loader2 className="h-5 w-5 animate-spin text-blue-500 mt-2" />}
                  </>
                )}
              </div>
              <Input
                id="attachment"
                type="file"
                accept=".pdf,application/pdf"
                className="sr-only"
                onChange={handleFileChange}
              />
            </Label>
            <ErrorMessage message="الحد الأقصى لحجم الملف: 5 ميجابايت - PDF فقط" />
          </SpacingWrapper>

          <SpacingWrapper>
            <Button
              onClick={submitForm}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md"
              disabled={
                isSubmitting || isUploading || !formValues.title || !formValues.attachmentUrl
              }
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  تقديم الرسالة
                </span>
              )}
            </Button>
          </SpacingWrapper>
        </CardGrid>
      </CardContent>
    </Card>
  );
}
