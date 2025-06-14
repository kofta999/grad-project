import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardGrid,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, File, Trash2, CheckCircle2, UploadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormikProps } from "formik";
import { apiClient } from "@/lib/client";
import { ApplicationStep3Type } from "@/lib/types";
import { SpacingWrapper } from "@/components/ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";

interface Step3Props {
  goPrevStep: () => void;
  formik: FormikProps<ApplicationStep3Type>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  applicationId?: number;
}

export default function ApplicationStep3Form({
  goPrevStep,
  formik,
  loading,
  setLoading,
  applicationId,
}: Step3Props) {
  const { values, setFieldValue } = formik;
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleAttachmentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!values.attachmentType) {
      toast.error("الرجاء اختيار نوع الهوية.");
      return;
    }

    const file = event.target.files?.[0];

    if (!file) {
      toast.error("الرجاء اختيار ملف.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("يجب أن لا يزيد الملف عن 2 ميجا بايت");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("يجب أن يكون الملف صورة");
      return;
    }

    try {
      setUploadLoading(true);
      const res = await apiClient.auth.upload.$post({ form: { file } });

      if (res.ok) {
        const { uploadUrl } = await res.json();
        setFieldValue("attachmentType", values.attachmentType);
        setFieldValue("attachments", [
          ...values.attachments,
          {
            type: values.attachmentType,
            attachmentUrl: uploadUrl,
          },
        ]);
        setFieldValue("attachmentFile", undefined);
        toast.success("تم رفع الملف بنجاح!");
        setIsFileUploaded(true);
      } else {
        toast.error("فشل رفع الملف.");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء رفع الملف.");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteAttachment = async (
    index: number,
    applicationId: number,
    attachmentId: number
  ) => {
    try {
      setDeletingIndex(index);
      const res = await apiClient.students.me.applications[":applicationId"].attachments[
        ":attachmentId"
      ].$delete({
        param: {
          applicationId: applicationId.toString(),
          attachmentId: attachmentId.toString(),
        },
      });
      if (res.ok) {
        toast.success("تم حذف الملف بنجاح!");
        handleRemoveAttachment(index);
      } else {
        toast.error("فشل حذف الملف من السيرفر.");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    } finally {
      setDeletingIndex(null);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = values.attachments.filter((_, i) => i !== index);
    setFieldValue("attachments", updatedAttachments);
  };

  const handleDeleteAttachmentButton = (index: number) => {
    const { attachmentId } = values.attachments[index];

    if (!attachmentId) {
      handleRemoveAttachment(index);
      return;
    }

    if (attachmentId) {
      handleDeleteAttachment(index, applicationId!, attachmentId);
      return;
    }
  };

  return (
    <Container>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex flex-col items-center">
          <Upload className="h-8 w-8 text-yellow-300" />
          <CardTitle className="text-white text-2xl font-bold text-center">
            إرسال مرفقات التسجيل
          </CardTitle>
          <CardDescription className="text-blue-100 flex items-center gap-2 text-center">
            <span className="h-2 w-2 bg-yellow-300 rounded-full animate-pulse"></span>
            يرجى رفع المستندات المطلوبة
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <CardGrid className="md:grid-cols-1">
              <SpacingWrapper>
                <Label>
                  نوع الهوية <span className="text-yellow-500">*</span>
                </Label>
                <Input
                  name="attachmentType"
                  value={formik.values.attachmentType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل نوع الهوية"
                />
                {formik.touched.attachmentType && formik.errors.attachmentType && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.attachmentType}</p>
                )}
              </SpacingWrapper>

              <SpacingWrapper>
                <Label>
                  صورة الهوية <span className="text-yellow-500">*</span>
                </Label>
                <Label
                  className={`relative cursor-pointer flex flex-col items-center justify-center border-2 hover:border-blue-500 border-dashed rounded-xl p-8 transition-colors ${
                    isFileUploaded ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50 "
                  }`}
                >
                  {uploadLoading ? (
                    <Loader className="h-20 w-20" />
                  ) : (
                    <>
                      <div className="flex flex-col items-center text-center">
                        {isFileUploaded ? (
                          <>
                            <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
                            <p className="font-medium text-green-600">✓ تم اختيار الملف</p>
                            <p className="text-sm text-gray-600 mt-1 truncate max-w-xs">
                              يرجي الضغط مرة اخري لاختيار ملف جديد
                            </p>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-10 w-10 text-mainColor mb-3" />
                            <p className="font-medium text-gray-600">اضغط لرفع الصورة</p>
                          </>
                        )}
                      </div>
                      <Input
                        id="attachmentFile"
                        type="file"
                        name="attachmentFile"
                        className="sr-only"
                        onChange={handleAttachmentUpload}
                        onBlur={formik.handleBlur}
                      />
                    </>
                  )}
                </Label>
                <ErrorMessage message="* يجب أن لا يزيد الملف عن 2 ميجا بايت - صورة فقط" />
              </SpacingWrapper>

              {formik.values.attachments.length > 0 && (
                <SpacingWrapper>
                  <Label className="text-lg font-semibold">المرفقات المضافة</Label>
                  <Card className="border border-gray-200 rounded-lg">
                    {formik.values.attachments.map((attachment, index) => (
                      <Link
                        key={attachment.attachmentUrl}
                        href={attachment.attachmentUrl}
                        target="_blank"
                        className="flex justify-between items-center p-4 border-b last:border-none"
                      >
                        <File className="text-mainColor" />
                        <p className="text-sm text-gray-600 w-1/2 mr-5">{attachment.type}</p>
                        <p className="text-sm truncate max-w-xs w-1/2">
                          {attachment.attachmentUrl.split("\\").pop()?.split("-").pop()}
                        </p>
                        {deletingIndex === index ? (
                          <Loader2 className="w-7 h-7 text-red-500 animate-spin" />
                        ) : (
                          <Trash2
                            className="text-red-500 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteAttachmentButton(index);
                            }}
                          />
                        )}
                      </Link>
                    ))}
                  </Card>
                </SpacingWrapper>
              )}

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-[#BABABA]"
                  onClick={goPrevStep}
                  type="button"
                >
                  السابق
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md"
                  type="submit"
                  disabled={
                    loading ||
                    formik.values.attachments.length === 0 ||
                    Object.keys(formik.errors).length > 0
                  }
                >
                  {loading ? <Loader className="w-6 h-6" /> : "التسجيل"}
                </Button>
              </div>
            </CardGrid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
