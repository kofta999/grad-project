import { Container, ContainerTitle } from "@/components/ui/container";
import React from "react";
import { Card, CardContent, CardHeader, CardGrid } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FormType } from "../page";

interface Step2Props {
  // onSubmit: (formData: Partial<FormType>) => void;
  goNextStep: () => void;
  goPrevStep: () => void;
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function Step2({
  formData,
  goNextStep,
  goPrevStep,
  // onSubmit,
  setFormData,
}: Step2Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      goNextStep();
    } catch (err) {
      console.error("Registration failed:", err);
      alert("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [parent, child] = name.split("."); // Split nested field names

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof formData],
        [child]: value,
      },
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    const [parent, child] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof formData],
        [child]: value,
      },
    }));
  };

  return (
    <>
      <Container>
        <ContainerTitle>تابع بيانات التسجيل</ContainerTitle>
        <form>
          <Card>
            <CardContent>
              <CardHeader>المؤهل المتقدم به</CardHeader>
              <CardGrid>
                <div className="space-y-2">
                  <Label>الدولة</Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.country", value)
                    }
                    value={formData.qualification.country}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    الجامعة
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.university", value)
                    }
                    value={formData.qualification.university}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجامعة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    الكلية
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.faculty", value)
                    }
                    value={formData.qualification.faculty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الكلية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    نوع المؤهل
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.type", value)
                    }
                    value={formData.qualification.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المؤهل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    المؤهل
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.qualification", value)
                    }
                    value={formData.qualification.qualification}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المؤهل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    التخصص
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.specialization", value)
                    }
                    value={formData.qualification.specialization}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التخصص" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    سنة المؤهل
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.year", value)
                    }
                    value={formData.qualification.year}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر سنة المؤهل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    تاريخ الحصول عليه
                    <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex justify-between text-right font-normal"
                      >
                        <span>اختر التاريخ</span>
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>نوع الدراسة</Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.creditHours", value)
                    }
                    value={formData.qualification.creditHours}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الدراسة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>التقدير</Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("qualification.grade", value)
                    }
                    value={formData.qualification.grade}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التقدير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2 justify-self-center md:w-full md:max-w-[calc(100%/2)]">
                  <Label>النسبة المئوية / المعدل التراكمي</Label>
                  <Input
                    name="qualification.gpa"
                    value={formData.qualification.gpa}
                    onChange={handleInputChange}
                  />
                </div>
              </CardGrid>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader>المؤهل المتقدم به</CardHeader>
              <CardGrid>
                <div className="space-y-2">
                  <Label>العام الاكاديمي للتسجيل</Label>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("registration.academicYear", value)
                    }
                    value={formData.registration.academicYear}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر العام الأكاديمي" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>الكلية</Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("registration.faculty", value)
                    }
                    value={formData.registration.faculty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الكلية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    الدرجات العلمية
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("registration.academicDegree", value)
                    }
                    value={formData.registration.academicDegree}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدرجة العلمية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    البرامج / التخصص
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: string) =>
                      handleSelectChange("registration.academicProgram", value)
                    }
                    value={formData.registration.academicProgram}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر البرنامج / التخصص" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region1">المنطقة 1</SelectItem>
                      <SelectItem value="region2">المنطقة 2</SelectItem>
                      <SelectItem value="region3">المنطقة 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardGrid>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-center gap-16">
            <Button
              variant="outline"
              className="border-[#BABABA]"
              onClick={goPrevStep}
            >
              السابق
            </Button>
            <Button
              className="bg-mainColor hover:bg-blue-700 text-white"
              onClick={handleSubmit}
            >
              التسجيل
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
