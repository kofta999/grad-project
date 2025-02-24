import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardGrid } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Container, ContainerTitle } from "@/components/ui/container";
import { FormType } from "../page";

interface Step1Props {
  updateStep: () => void;
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function Step1({
  updateStep,
  formData,
  setFormData,
}: Step1Props) {
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      updateStep();
    } catch (err) {
      console.error("Registration failed:", err);
      alert("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <ContainerTitle>إنشاء حساب جديد</ContainerTitle>

      {/* Basic Information */}
      <Card>
        <CardContent>
          <CardHeader>المعلومات الأساسية</CardHeader>
          <CardGrid>
            <div className="space-y-2">
              <Label>
                الاسم الرباعي (بالعربية)
                <span className="text-red-500">*</span>
              </Label>
              <Input
                name="fullNameAr"
                value={formData.fullNameAr}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                الاسم الرباعي (بالانجليزية)
                <span className="text-red-500">*</span>
              </Label>
              <Input
                name="fullNameEn"
                value={formData.fullNameEn}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                الجنسية
                <span className="text-red-500">*</span>
              </Label>
              <Input
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                النوع (الجنس)
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender ? "male" : "female"}
                onValueChange={(value: "male" | "female") =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: value === "male",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2 justify-self-center w-full max-w-[calc(100%/2)]">
              <Label>
                تاريخ الميلاد
                <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !formData.dob && "text-muted-foreground",
                    )}
                  >
                    {formData.dob ? formData.dob : <span>اختر التاريخ</span>}
                    <CalendarIcon className="mr-auto h-4 w-4 text-mainColor" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dob ? new Date(formData.dob) : undefined}
                    onSelect={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        dob: date ? date.toLocaleDateString("en-US") : "",
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardGrid>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardContent className="pt-6">
          <CardHeader className="text-lg font-semibold mb-4">
            معلومات الاتصال
          </CardHeader>
          <CardGrid>
            <div className="space-y-2">
              <Label>
                البريد الإلكتروني
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>فاكس</Label>
              <Input
                type="tel"
                name="fax"
                value={formData.fax ?? ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                رقم الهاتف
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                name="phoneNoMain"
                value={formData.phoneNoMain}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>رقم هاتف آخر</Label>
              <Input
                type="tel"
                name="phoneNoSec"
                value={formData.phoneNoSec ?? ""}
                onChange={handleInputChange}
              />
            </div>
          </CardGrid>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardContent className="pt-6">
          <CardHeader className="text-lg font-semibold mb-4">الأمان</CardHeader>
          <CardGrid>
            <div className="space-y-2">
              <Label>
                كلمة المرور
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                name="hashedPassword"
                value={formData.hashedPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                تأكيد كلمة المرور
                <span className="text-red-500">*</span>
              </Label>
              {/* TODO: FIX */}
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                سؤال الأمان
                <span className="text-red-500">*</span>
              </Label>
              <Input
                name="secQuestion"
                value={formData.secQuestion}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                إجابة سؤال الأمان
                <span className="text-red-500">*</span>
              </Label>
              <Input
                name="secAnswer"
                value={formData.secAnswer}
                onChange={handleInputChange}
              />
            </div>
          </CardGrid>
        </CardContent>
      </Card>

      <div className="flex justify-center items-center">
        <Button
          onClick={handleSubmit}
          className="px-8 py-2 bg-mainColor hover:bg-blue-700 text-white"
        >
          التالي
        </Button>
      </div>
    </Container>
  );
}
