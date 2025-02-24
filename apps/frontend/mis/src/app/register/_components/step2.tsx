import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardGrid, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Container, ContainerTitle } from "@/components/ui/container";
import { FormType } from "../page";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/client";

interface Step2Props {
  onSubmit: (formData: Partial<FormType>) => void;
  goNextStep: () => void;
  goPrevStep: () => void;
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function Step2({
  onSubmit,
  goNextStep,
  goPrevStep,
  formData,
  setFormData,
}: Step2Props) {
  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const res = await apiClient.auth.upload.$post({ form: { file } });

      if (res.ok) {
        const { uploadUrl } = await res.json();
        setFormData((prev) => ({ ...prev, imageUrl: uploadUrl }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      goNextStep();
      onSubmit(formData);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  return (
    <Container>
      <ContainerTitle>تابع نموذج التسجيل الأكاديمي</ContainerTitle>
      {/* Identity Information */}
      <Card>
        <CardContent>
          <CardHeader>الهوية</CardHeader>
          <CardGrid>
            <div className="space-y-2">
              <Label>
                نوع الهوية<span className="text-red-500">*</span>
              </Label>
              <Select
                name="idType"
                onValueChange={(value: "national_id" | "passport") =>
                  setFormData((prev) => ({ ...prev, idType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الهوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national_id">بطاقة وطنية</SelectItem>
                  <SelectItem value="passport">جواز سفر</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                رقم الهوية<span className="text-red-500">*</span>
              </Label>
              <Input
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                تاريخ اصدار الهوية<span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !formData.idIssuanceDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {formData.idIssuanceDate ? (
                      formData.idIssuanceDate
                    ) : (
                      <span>اختر التاريخ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.idIssuanceDate
                        ? new Date(formData.idIssuanceDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        idIssuanceDate: date
                          ? date.toISOString().split("T")[0]
                          : "",
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>
                جهة الاصدار<span className="text-red-500">*</span>
              </Label>
              <Input
                name="idIssuanceAuthority"
                value={formData.idAuthority}
                onChange={handleInputChange}
              />
            </div>
          </CardGrid>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardContent>
          <CardHeader>معلومات إضافية</CardHeader>
          <CardGrid>
            <div className="space-y-2">
              <Label>
                الحالة الاجتماعية<span className="text-red-500">*</span>
              </Label>
              <Select
                name="maritalStatus"
                onValueChange={(value: FormType["martialStatus"]) =>
                  setFormData((prev) => ({ ...prev, martialStatus: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">أعزب</SelectItem>
                  <SelectItem value="married">متزوج</SelectItem>
                  <SelectItem value="divorced">مطلق</SelectItem>
                  <SelectItem value="widowed">أرمل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                الحالة العسكرية<span className="text-red-500">*</span>
              </Label>
              <Input
                name="militaryStatus"
                value={formData.militaryStatus}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>جهة العمل</Label>
              <Input
                type="text"
                name="jobType"
                value={formData.jobType as any}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                الطالب يعمل؟<span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                name="isStudentWorking"
                value={formData.isWorking ? "yes" : "no"}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    isWorking: value === "yes",
                  }))
                }
                className="flex gap-4 pt-2"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">نعم</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">لا</Label>
                </div>
              </RadioGroup>
            </div>
          </CardGrid>
        </CardContent>
      </Card>

      {/* Personal Photo */}
      <Card>
        <CardContent>
          <CardHeader>الصورة الشخصية</CardHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {formData.imageUrl ? (
                <Image
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Personal photo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="w-full">
              <Label className="w-full">
                <div className="bg-gray-100 py-3 px-4 rounded text-center cursor-pointer hover:bg-gray-200 transition-colors">
                  اختر صورة للتحميل
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </Label>
              <p className="text-sm text-red-500 text-center mt-2">
                * يجب أن لا يزيد الملف عن 2 ميجا بايت
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={goPrevStep}>
          السابق
        </Button>
        <Button
          className="bg-gray-600 hover:bg-gray-700 text-white"
          onClick={handleSubmit}
        >
          التسجيل
        </Button>
      </div>
    </Container>
  );
}
