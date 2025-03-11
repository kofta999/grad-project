"use client";

import React, { useState } from "react";
import { Container, ContainerTitle } from "@/components/ui/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, File, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/client";
import { InferRequestType } from "@repo/mis-api";
import { useApplicationIdContext } from "../application-id-context";

type FormData = InferRequestType<
  typeof apiClient.student.applications.attachments.$post
>["json"];

export default function ApplicationAttachmentsForm() {
  const { applicationId } = useApplicationIdContext();
  const [attachmentType, setAttachmentType] = useState("");

  if (!applicationId) {
    throw new Error("FIXME");
  }

  const [formData, setFormData] = useState<FormData>({
    applicationId,
    attachments: [],
  });

  const handleSubmit = async () => {
    try {
      const res = await apiClient.student.applications.attachments.$post({
        json: formData,
      });

      if (!res.ok) {
        throw new Error("حدث خطأ في إرسال المرفقات");
      }
    } catch (error) {
      console.error(error);
      // @ts-ignore
      alert(error.message);
    }
  };

  const handleAttachmentUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const res = await apiClient.auth.upload.$post({ form: { file } });

      if (res.ok) {
        const { uploadUrl } = await res.json();
        setFormData((prev) => ({
          ...prev,
          attachments: [
            ...prev.attachments,
            { type: attachmentType, attachmentUrl: uploadUrl },
          ],
        }));
      }
    }
  };

  return (
    <Container>
      <ContainerTitle>إرسال مرفقات التسجيل</ContainerTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Card>
          <CardContent>
            <CardHeader>رفع المستندات المطلوبة</CardHeader>
            <div className="space-y-2">
              <Label>
                نوع الهوية
                <span className="text-red-500">*</span>
              </Label>
              <Input
                value={attachmentType}
                onChange={(e) => setAttachmentType(e.target.value)}
              />
            </div>

            <div className="bg-[#dcdcdc] p-6 mt-6 rounded-sm">
              <div className="w-full flex flex-col justify-center items-center">
                <Upload className="block text-[#9ca3af] mb-2" />
                <Label className="w-full">
                  <div className="bg-gray-100 py-3 px-4 rounded text-center cursor-pointer hover:bg-gray-200 transition-colors">
                    اختر صورة للتحميل
                  </div>
                  <Input
                    type="file"
                    accept=""
                    className="hidden"
                    disabled={attachmentType === ""}
                    onChange={handleAttachmentUpload}
                  />
                </Label>
                <p className="text-sm text-red-500 text-center mt-2">
                  * يجب أن لا يزيد الملف عن 2 ميجا بايت
                </p>
              </div>
            </div>

            <Card>
              <div className="space-y-2 border-b">
                {formData.attachments.map((attachment) => (
                  <div
                    className="file flex justify-between items-center p-4"
                    key={attachment.attachmentUrl}
                  >
                    <File />
                    <p>{attachment.attachmentUrl.split("/").pop()}</p>
                    <p>{attachment.type}</p>
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => alert("TODO")}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Link href="/applications">
            <Button variant="outline">السابق</Button>
          </Link>
          <Button
            className="bg-gray-600 hover:bg-gray-700 text-white"
            type="submit"
          >
            التسجيل
          </Button>
        </div>
      </form>
    </Container>
  );
}
