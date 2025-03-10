import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardGrid,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone,User, Mail } from "lucide-react";
import { Container, ContainerTitle } from "@/components/ui/container";
import Link from "next/link";
import { FormType } from "../page";

interface Step1Props {
  // onSubmit: (formData: Partial<FormType>) => void;
  updateStep: () => void;
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function Step1({
  formData,
  // onSubmit,
  setFormData,
  updateStep,
}: Step1Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      updateStep();
      // onSubmit(formData);
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
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
    <Container>
      <ContainerTitle>بيانات التسجيل</ContainerTitle>

      <form onSubmit={handleSubmit}>
        {/* Permanent Address */}
        <Card>
          <CardContent>
            <CardHeader>العنوان الدائم</CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  الدولة
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    handleSelectChange("permanentAddress.country", value)
                  }
                  value={formData.permanentAddress.country}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  {/* TODO: Add real countries */}
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  المدينة
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    handleSelectChange("permanentAddress.city", value)
                  }
                  value={formData.permanentAddress.city}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2 w-full md:w-1/2 mx-auto">
                <Label>
                  العنوان
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="permanentAddress.fullAddress"
                  value={formData.permanentAddress.fullAddress}
                  onChange={handleInputChange}
                  required
                  icon={<MapPin className="h-4 w-4" />}
                />
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Current Address */}
        <Card>
          <CardContent>
            <CardHeader>العنوان الحالي</CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>
                  الدولة
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    handleSelectChange("currentAddress.country", value)
                  }
                  value={formData.currentAddress.country}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  {/* TODO: Add real countries */}
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  المدينة
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    handleSelectChange("currentAddress.city", value)
                  }
                  value={formData.currentAddress.city}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2 w-full md:w-1/2 mx-auto">
                <Label>
                  العنوان
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="currentAddress.fullAddress"
                  value={formData.currentAddress.fullAddress}
                  onChange={handleInputChange}
                  required
                  icon={<MapPin className="h-4 w-4" />}
                />
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardContent>
            <CardHeader>شخصيات يمكن الرجوع اليها</CardHeader>
            <CardGrid>
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input
                  name="emergencyContact.name"
                  value={formData.emergencyContact?.name}
                  onChange={handleInputChange}
                  icon={<User className="h-4 w-4" />}
                />
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input
                  name="emergencyContact.address"
                  value={formData.emergencyContact?.address ?? ""}
                  onChange={handleInputChange}
                  icon={<MapPin className="h-4 w-4" />}

                />
              </div>
              <div className="space-y-2">
                <Label>التليفون</Label>
                <Input
                  type="tel"
                  name="emergencyContact.phoneNumber"
                  value={formData.emergencyContact?.phoneNumber}
                  onChange={handleInputChange}
                  icon={<Phone className="h-4 w-4" />}

                />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  name="emergencyContact.email"
                  value={formData.emergencyContact?.email ?? ""}
                  onChange={handleInputChange}
                  icon={<Mail className="h-4 w-4" />}

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
      </form>
    </Container>
  );
}
