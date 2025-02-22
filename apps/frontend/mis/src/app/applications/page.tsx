"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardGrid, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone } from "lucide-react";
import { hcWithType } from "@repo/mis-api";
import { Container,ContainerTitle } from "@/components/ui/container";
import  Link  from 'next/link';

const client = hcWithType("http://127.0.0.1:3000");

export default function ApplicationForm1() {
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
    const [parent, child] = name.split(".");

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
      const res = await client.applications.$post({
        json: {
          ...formData,
          qualification: {
            country: "USA",
            university: "State University",
            faculty: "Engineering",
            type: "Bachelor",
            qualification: "BSc",
            specialization: "Computer Science",
            year: "2020",
            date: "2020-05-15",
            creditHours: true,
            grade: "A",
            gpa: "3.8",
          },
          registration: {
            academicYear: "2021-2022",
            faculty: "Engineering",
            academicDegree: "Master",
            academicProgram: "Software Engineering",
          },
        },
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
    <Container>
      <ContainerTitle>بيانات التسجيل</ContainerTitle>

      <form onSubmit={handleSubmit}>
        {/* Permanent Address */}
        <Card>
          <CardContent>
            <CardHeader>
              العنوان الدائم
            </CardHeader>
            <CardGrid>
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
            </CardGrid>
          </CardContent>
        </Card>

        {/* Current Address */}
        <Card>
          <CardContent>
            <CardTitle>العنوان الحالي</CardTitle>
            <CardGrid>
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
              <div className="space-y-2 md:col-span-2">
                <Label>رقم المنزل</Label>
                <Input
                  name="currentAddress.houseNumber"
                  value={formData.currentAddress.houseNumber}
                  onChange={handleInputChange}
                />
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardContent>
            <CardHeader>
              شخصيات يمكن الرجوع اليها
            </CardHeader>
            <CardGrid>
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
            </CardGrid>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Link href="/register/step2">
          <Button variant="outline">السابق</Button>
          </Link>
          <Link href="/applications/step2">
            <Button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              التالي
            </Button>
          </Link>
          
        </div>
      </form>
    </Container>
  );
}
