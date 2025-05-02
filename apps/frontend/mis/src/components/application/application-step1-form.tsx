import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardGrid, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, User, Mail } from "lucide-react";
import { Container, ContainerTitle } from "@/components/ui/container";
import { FormikProps } from "formik";
import { ApplicationStep1Type } from "@/lib/types";

interface Step1Props {
  formik: FormikProps<ApplicationStep1Type>;
}

export default function ApplicationStep1Form({ formik }: Step1Props) {
  return (
    <Container>
      <ContainerTitle>بيانات التسجيل</ContainerTitle>

      <form onSubmit={formik.handleSubmit}>
        {/* Permanent Address */}
        <Card>
          <CardContent>
            <CardHeader>العنوان الدائم</CardHeader>
            <CardGrid>
              {/* Country */}
              <div className="space-y-2">
                <Label>
                  الدولة<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.permanentAddress.country}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("permanentAddress.country", value)
                  }
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
                {formik.touched.permanentAddress?.country &&
                  formik.errors.permanentAddress?.country && (
                    <p className="text-red-500 text-sm">{formik.errors.permanentAddress.country}</p>
                  )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label>
                  المدينة<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.permanentAddress.city}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("permanentAddress.city", value)
                  }
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
                {formik.touched.permanentAddress?.city && formik.errors.permanentAddress?.city && (
                  <p className="text-red-500 text-sm">{formik.errors.permanentAddress.city}</p>
                )}
              </div>

              {/* Full Address */}
              <div className="space-y-2 md:col-span-2 w-full md:w-1/2 mx-auto">
                <Label>
                  العنوان<span className="text-red-500">*</span>
                </Label>
                <Input
                  name="permanentAddress.fullAddress"
                  value={formik.values.permanentAddress.fullAddress}
                  onChange={formik.handleChange}
                  icon={<MapPin className="h-4 w-4" />}
                />
                {formik.touched.permanentAddress?.fullAddress &&
                  formik.errors.permanentAddress?.fullAddress && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.permanentAddress.fullAddress}
                    </p>
                  )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Current Address */}
        <Card>
          <CardContent>
            <CardHeader>العنوان الحالي</CardHeader>
            <CardGrid>
              {/* Country */}
              <div className="space-y-2">
                <Label>
                  الدولة<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.currentAddress.country}
                  onValueChange={(value: any) =>
                    formik.setFieldValue("currentAddress.country", value)
                  }
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
                {formik.touched.currentAddress?.country &&
                  formik.errors.currentAddress?.country && (
                    <p className="text-red-500 text-sm">{formik.errors.currentAddress.country}</p>
                  )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label>
                  المدينة<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.currentAddress.city}
                  onValueChange={(value: any) => formik.setFieldValue("currentAddress.city", value)}
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
                {formik.touched.currentAddress?.city && formik.errors.currentAddress?.city && (
                  <p className="text-red-500 text-sm">{formik.errors.currentAddress.city}</p>
                )}
              </div>

              {/* Full Address */}
              <div className="space-y-2 md:col-span-2 w-full md:w-1/2 mx-auto">
                <Label>
                  العنوان<span className="text-red-500">*</span>
                </Label>
                <Input
                  name="currentAddress.fullAddress"
                  value={formik.values.currentAddress.fullAddress}
                  onChange={formik.handleChange}
                  icon={<MapPin className="h-4 w-4" />}
                />
                {formik.touched.currentAddress?.fullAddress &&
                  formik.errors.currentAddress?.fullAddress && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.currentAddress.fullAddress}
                    </p>
                  )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardContent>
            <CardHeader>شخصيات يمكن الرجوع اليها</CardHeader>
            <CardGrid>
              {/* Name */}
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input
                  name="emergencyContact.name"
                  value={formik.values.emergencyContact.name}
                  onChange={formik.handleChange}
                  icon={<User className="h-4 w-4" />}
                />
                {formik.touched.emergencyContact?.name && formik.errors.emergencyContact?.name && (
                  <p className="text-red-500 text-sm">{formik.errors.emergencyContact.name}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input
                  name="emergencyContact.address"
                  value={formik.values.emergencyContact.address}
                  onChange={formik.handleChange}
                  icon={<MapPin className="h-4 w-4" />}
                />
                {formik.touched.emergencyContact?.address &&
                  formik.errors.emergencyContact?.address && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.emergencyContact?.address}
                    </p>
                  )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label>التليفون</Label>
                <Input
                  type="tel"
                  name="emergencyContact.phoneNumber"
                  value={formik.values.emergencyContact.phoneNumber}
                  onChange={formik.handleChange}
                  icon={<Phone className="h-4 w-4" />}
                />
                {formik.touched.emergencyContact?.phoneNumber &&
                  formik.errors.emergencyContact?.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.emergencyContact?.phoneNumber}
                    </p>
                  )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  name="emergencyContact.email"
                  value={formik.values.emergencyContact.email}
                  onChange={formik.handleChange}
                  icon={<Mail className="h-4 w-4" />}
                />
                {formik.touched.emergencyContact?.email &&
                  formik.errors.emergencyContact?.email && (
                    <p className="text-red-500 text-sm">{formik.errors.emergencyContact?.email}</p>
                  )}
              </div>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <Button type="submit" className="px-8 py-2 bg-mainColor hover:bg-blue-700 text-white">
            التالي
          </Button>
        </div>
      </form>
    </Container>
  );
}
