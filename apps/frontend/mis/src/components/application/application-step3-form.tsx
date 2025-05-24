import { Container, ContainerTitle } from "@/components/ui/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, File, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormikProps } from "formik";
import { apiClient } from "@/lib/client";
import { ApplicationStep3Type } from "@/lib/types";
import { SpacingWrapper } from "@/components/ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";

interface Step3Props {
  goPrevStep: () => void;
  formik: FormikProps<ApplicationStep3Type>;
  loading: boolean;
}

export default function ApplicationStep3Form({ goPrevStep, formik, loading }: Step3Props) {
  const { values, setFieldValue } = formik;

  const handleAttachmentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("attachmentFile", file);
      const res = await apiClient.auth.upload.$post({ form: { file } });
      if (res.ok) {
        const { uploadUrl } = await res.json();
        setFieldValue("attachments", [
          ...values.attachments,
          { type: values.attachmentType, attachmentUrl: uploadUrl },
        ]);
      }
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = values.attachments.filter((_, i) => i !== index);
    setFieldValue("attachments", updatedAttachments);
  };

  return (
    <Container>
      <ContainerTitle>إرسال مرفقات التسجيل</ContainerTitle>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <CardHeader>رفع المستندات المطلوبة</CardHeader>
            <SpacingWrapper>
              <Label>
                نوع الهوية<span className="text-red-500">*</span>
              </Label>
              <Input
                name="attachmentType"
                value={formik.values.attachmentType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.attachmentType && formik.errors.attachmentType && (
                <p className="text-red-500 text-sm">{formik.errors.attachmentType}</p>
              )}
            </SpacingWrapper>

            <div className="bg-[#dcdcdc] p-6 mt-6 rounded-sm">
              <div className="w-full flex flex-col justify-center items-center">
                <Upload className="block text-[#9ca3af] mb-2" />
                <Label className="w-full">
                  <div className="bg-gray-100 py-3 px-4 rounded text-center cursor-pointer hover:bg-gray-200 transition-colors">
                    اختر صورة للتحميل
                  </div>
                  <Input
                    type="file"
                    name="attachmentFile"
                    className="hidden"
                    disabled={!formik.values.attachmentType}
                    onChange={handleAttachmentUpload}
                    onBlur={formik.handleBlur}
                  />
                </Label>
                {formik.touched.attachmentFile && formik.errors.attachmentFile && (
                  <p className="text-sm text-red-500 text-center mt-2">
                    <>{formik.errors.attachmentFile}</>
                  </p>
                )}
                <ErrorMessage message="* يجب أن لا يزيد الملف عن 2 ميجا بايت" />
              </div>
            </div>

            {/* Attachments List */}
            <Card>
              <SpacingWrapper className="border-b">
                {formik.values.attachments.map((attachment, index) => (
                  <SpacingWrapper
                    className="file flex justify-between items-center p-4"
                    key={attachment.attachmentUrl}
                  >
                    <File />
                    <p>{attachment.attachmentUrl.split("/").pop()}</p>
                    <p>{attachment.type}</p>
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleRemoveAttachment(index)}
                    />
                  </SpacingWrapper>
                ))}
              </SpacingWrapper>
            </Card>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="border-[#BABABA]" onClick={goPrevStep}>
            السابق
          </Button>
          <Button className="bg-gray-600 hover:bg-gray-700 text-white" type="submit">
            التسجيل
          </Button>
        </div>
      </form>
    </Container>
  );
}
