import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardGrid, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, User, Mail, MapPinHouse } from "lucide-react";
import { Container, ContainerTitle } from "@/components/ui/container";
import { FormikProps } from "formik";
import { ApplicationStep1Type } from "@/lib/types";
import { usePathname } from "next/navigation";
import { SpacingWrapper } from "../ui/spacing-wrapper";
import { ErrorMessage } from "../ui/error-message";
import CountrySelect from "../ui/CountrySelect";
import StateSelect from "../ui/StateSelect";

interface Step1Props {
  formik: FormikProps<ApplicationStep1Type>;
}

export default function ApplicationStep1Form({ formik }: Step1Props) {
  const pathname = usePathname();

  return (
    <Container>
      <ContainerTitle>
        {pathname === "/dashboard/applications" ? "بيانات التسجيل" : "تعديل بيانات التسجيل"}
      </ContainerTitle>

      <form onSubmit={formik.handleSubmit}>
        {/* Permanent Address */}
        <Card>
          <CardHeader>
            <CardTitle>
              <MapPinHouse className="h-4 w-4 text-yellow-500" />
              العنوان الدائم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGrid>
              {/* Country */}
              <SpacingWrapper>
                <CountrySelect
                  name="permanentAddress.countryId"
                  label="الدولة"
                  value={formik.values.permanentAddress.countryId.toString()}
                  error={formik.errors.permanentAddress?.countryId}
                  touched={formik.touched.permanentAddress?.countryId}
                  onChange={(value) => {
                    formik.setFieldValue("permanentAddress.countryId", parseInt(value));
                    formik.setFieldValue("permanentAddress.cityId", "");
                    // getStates(value);
                  }}
                  required={pathname === "/dashboard/applications"}
                />
              </SpacingWrapper>
              {/* City */}
              <SpacingWrapper>
                <StateSelect
                  name="permanentAddress.cityId"
                  label="المدينة"
                  countryCode={formik.values.permanentAddress.countryId.toString()}
                  value={formik.values.permanentAddress.cityId.toString()}
                  error={formik.errors.permanentAddress?.cityId}
                  touched={formik.touched.permanentAddress?.cityId}
                  onChange={(value) => {
                    formik.setFieldValue("permanentAddress.cityId", parseInt(value));
                  }}
                  required={pathname === "/dashboard/applications"}
                />
              </SpacingWrapper>

              {/* Full Address */}
              <SpacingWrapper className="md:col-span-2 w-full md:w-1/2 mx-auto">
                <Label>
                  العنوان
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Input
                  name="permanentAddress.fullAddress"
                  value={formik.values.permanentAddress.fullAddress}
                  onChange={formik.handleChange}
                  icon={<MapPin className="h-4 w-4" />}
                />
                {formik.touched.permanentAddress?.fullAddress &&
                  formik.errors.permanentAddress?.fullAddress && (
                    <ErrorMessage message={formik.errors.permanentAddress.fullAddress} />
                  )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Current Address */}
        <Card>
          <CardHeader>
            <CardTitle>
              <MapPinHouse className="h-4 w-4 text-yellow-500" />
              العنوان الحالي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGrid>
              {/* Country */}
              <SpacingWrapper>
                <CountrySelect
                  name="currentAddress.countryId"
                  label="الدولة"
                  value={formik.values.currentAddress.countryId.toString()}
                  error={formik.errors.currentAddress?.countryId}
                  touched={formik.touched.currentAddress?.countryId}
                  onChange={(value) => {
                    formik.setFieldValue("currentAddress.countryId", parseInt(value));
                    formik.setFieldValue("currentAddress.cityId", "");
                  }}
                  required={pathname === "/dashboard/applications"}
                />
              </SpacingWrapper>

              {/* City */}
              <SpacingWrapper>
                <StateSelect
                  name="currentAddress.cityId"
                  label="المدينة"
                  countryCode={formik.values.currentAddress.countryId.toString()}
                  value={formik.values.currentAddress.cityId.toString()}
                  error={formik.errors.currentAddress?.cityId}
                  touched={formik.touched.currentAddress?.cityId}
                  onChange={(value) => {
                    formik.setFieldValue("currentAddress.cityId", parseInt(value));
                  }}
                  required={pathname === "/dashboard/applications"}
                />
              </SpacingWrapper>

              {/* Full Address */}
              <SpacingWrapper className="md:col-span-2 w-full md:w-1/2 mx-auto">
                <Label>
                  العنوان
                  {pathname === "/dashboard/applications" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Input
                  name="currentAddress.fullAddress"
                  value={formik.values.currentAddress.fullAddress}
                  onChange={formik.handleChange}
                  icon={<MapPin className="h-4 w-4" />}
                />
                {formik.touched.currentAddress?.fullAddress &&
                  formik.errors.currentAddress?.fullAddress && (
                    <ErrorMessage message={formik.errors.currentAddress.fullAddress} />
                  )}
              </SpacingWrapper>
            </CardGrid>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle>
              <User className="h-4 w-4 text-yellow-500" />
              شخصيات يمكن الرجوع اليها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardGrid>
              {/* Name */}
              <SpacingWrapper>
                <Label>الاسم</Label>
                <Input
                  name="emergencyContact.name"
                  value={formik.values.emergencyContact.name}
                  onChange={formik.handleChange}
                  icon={<User className="h-4 w-4" />}
                />
                {formik.touched.emergencyContact?.name && formik.errors.emergencyContact?.name && (
                  <ErrorMessage message={formik.errors.emergencyContact.name} />
                )}
              </SpacingWrapper>

              {/* Address */}
              <SpacingWrapper>
                <Label>العنوان</Label>
                <Input
                  name="emergencyContact.address"
                  value={formik.values.emergencyContact.address}
                  onChange={formik.handleChange}
                  icon={<MapPin className="h-4 w-4" />}
                />
                {formik.touched.emergencyContact?.address &&
                  formik.errors.emergencyContact?.address && (
                    <ErrorMessage message={formik.errors.emergencyContact.address} />
                  )}
              </SpacingWrapper>

              {/* Phone Number */}
              <SpacingWrapper>
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
                    <ErrorMessage message={formik.errors.emergencyContact.phoneNumber} />
                  )}
              </SpacingWrapper>

              {/* Email */}
              <SpacingWrapper>
                <Label>البريد الإلكتروني</Label>
                <Input
                  name="emergencyContact.email"
                  value={formik.values.emergencyContact.email}
                  onChange={formik.handleChange}
                  icon={<Mail className="h-4 w-4" />}
                />
                {formik.touched.emergencyContact?.email &&
                  formik.errors.emergencyContact?.email && (
                    <ErrorMessage message={formik.errors.emergencyContact.email} />
                  )}
              </SpacingWrapper>
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
