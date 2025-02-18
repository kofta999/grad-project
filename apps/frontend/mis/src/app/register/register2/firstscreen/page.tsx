"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone } from "lucide-react";
import { hcWithType } from "@repo/mis-api";

const client = hcWithType("https://127.0.0.1:3000");

export default function RegistrationFormPart3() {
  // State for form data
  const [formData, setFormData] = useState({
    permanentAddress: {
      city: "",
      houseNumber: "",
      street: "",
    },
    currentAddress: {
      city: "",
      houseNumber: "",
      street: "",
    },
    emergencyContact: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

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
    const [parent, child] = name.split("."); // Split nested field names

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof formData],
        [child]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await client.auth.register2.$post({
        json: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Registration successful:", result);
      alert("تم التسجيل بنجاح!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">بيانات التسجيل</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        {/* Permanent Address */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">العنوان الدائم</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>رقم المنزل</Label>
                <Input
                  name="permanentAddress.houseNumber"
                  value={formData.permanentAddress.houseNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>الشارع</Label>
                <Input
                  name="permanentAddress.street"
                  value={formData.permanentAddress.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>
                  محافظة / مدينة / شارع / حي
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("permanentAddress.city", value)
                  }
                  value={formData.permanentAddress.city}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Address */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">العنوان الحالي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  محافظة / مدينة / شارع / حي
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("currentAddress.city", value)
                  }
                  value={formData.currentAddress.city}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region1">المنطقة 1</SelectItem>
                    <SelectItem value="region2">المنطقة 2</SelectItem>
                    <SelectItem value="region3">المنطقة 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الشارع</Label>
                <Input
                  name="currentAddress.street"
                  value={formData.currentAddress.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>رقم المنزل</Label>
                <Input
                  name="currentAddress.houseNumber"
                  value={formData.currentAddress.houseNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">شخصيات يمكن الرجوع اليها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input
                  name="emergencyContact.address"
                  value={formData.emergencyContact.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>التليفون</Label>
                <Input
                  type="tel"
                  name="emergencyContact.phoneNumber"
                  value={formData.emergencyContact.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  name="emergencyContact.email"
                  value={formData.emergencyContact.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button variant="outline">السابق</Button>
          <Button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white">
            التالي
          </Button>
        </div>
      </form>
    </div>
  );
}