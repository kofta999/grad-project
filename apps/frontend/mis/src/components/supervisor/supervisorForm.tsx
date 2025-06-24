import { useState, ChangeEvent } from "react";
import { UploadCloud, CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { apiClient } from "@/lib/client";
import { SupervisorFormData } from "@/lib/types";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

interface SupervisorFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function SupervisorForm({ onCancel, onSuccess }: SupervisorFormProps) {
  const [formValues, setFormValues] = useState<SupervisorFormData>({
    fullNameAr: "",
    fullNameEn: "",
    email: "",
    imageUrl: null,
    isOutsider: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File): Promise<void> => {
    setIsUploading(true);
    const toastId = toast.loading("جاري رفع الصورة...");

    try {
      const uploadResponse = await apiClient.auth.upload.$post({
        form: { file },
      });

      if (!uploadResponse.ok) {
        throw new Error("فشل في رفع الصورة");
      }

      const { uploadUrl } = await uploadResponse.json();
      setFormValues((prev) => ({ ...prev, imageUrl: uploadUrl }));
      toast.success("تم رفع الصورة بنجاح", { id: toastId });
    } catch (error) {
      toast.error("فشل في رفع الصورة", { id: toastId });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("يجب أن تكون الصورة من نوع JPEG أو PNG أو WebP");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("يجب أن يكون حجم الصورة أقل من 2 ميجابايت");
      return;
    }

    await uploadImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.fullNameAr || !formValues.fullNameEn || !formValues.email) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiClient.supervisors.$post({ json: formValues });
      if (!response.ok) throw new Error("Failed to create supervisor");

      toast.success("تم إضافة المشرف بنجاح");
      onSuccess();
    } catch (error) {
      toast.error("فشل في إضافة المشرف");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-xl shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex flex-col items-center space-y-2">
          <UserPlus className="h-8 w-8 text-yellow-300" />
          <CardTitle className="text-white text-2xl font-bold text-center">
            تسجيل مشرف جديد
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="fullNameAr" className="text-gray-700 font-medium block text-right">
              الاسم الكامل (عربي) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullNameAr"
              value={formValues.fullNameAr}
              onChange={(e) => setFormValues({ ...formValues, fullNameAr: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
              placeholder="أدخل الاسم الكامل بالعربية"
              required
              minLength={1}
              maxLength={100}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="fullNameEn" className="text-gray-700 font-medium block text-right">
              الاسم الكامل (إنجليزي) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullNameEn"
              value={formValues.fullNameEn}
              onChange={(e) => setFormValues({ ...formValues, fullNameEn: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left"
              placeholder="Enter full name in English"
              required
              minLength={1}
              maxLength={100}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-gray-700 font-medium block text-right">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left"
              placeholder="example@domain.com"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium block text-right">صورة المشرف</Label>

            <label
              htmlFor="image"
              className={`relative cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 hover:border-blue-500 transition-colors ${
                formValues.imageUrl ? "border-blue-500 bg-green-50" : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {formValues.imageUrl ? (
                  <>
                    <CheckCircle2 className="h-10 w-10 text-blue-500 mb-3" />
                    <p className="font-medium text-blue-600">✓ تم اختيار الصورة</p>
                    <p className="text-sm text-gray-600 mt-1 truncate max-w-xs">
                      {formValues.imageUrl.split("/").pop()}
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-10 w-10 text-blue-500 mb-3" />
                    <p className="font-medium text-gray-600">اضغط لرفع الصورة أو اسحبها هنا</p>
                    {isUploading && <Loader2 className="h-5 w-5 animate-spin text-blue-500 mt-2" />}
                  </>
                )}
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
            <p className="text-xs text-gray-500 text-right mt-1">
              الحد الأقصى لحجم الصورة: 2 ميجابايت - JPEG, PNG, WebP فقط
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="isOutsider" className="text-gray-700 font-medium text-right">
              مشرف خارجي
            </Label>
            <Checkbox
              id="isOutsider"
              checked={formValues.isOutsider}
              onCheckedChange={(checked) => setFormValues({ ...formValues, isOutsider: !!checked })}
              className="h-5 w-5 border-gray-300 data-[state=checked]:bg-blue-600"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              disabled={isSubmitting || isUploading}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
              disabled={
                isSubmitting ||
                isUploading ||
                !formValues.fullNameAr ||
                !formValues.fullNameEn ||
                !formValues.email
              }
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري التسجيل...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">تسجيل المشرف</span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
