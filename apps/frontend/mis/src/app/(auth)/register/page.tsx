"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { apiClient } from "@/lib/client";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { RegisterStep1Schema, RegisterStep2Schema } from "@/lib/schemas";
import { RegisterStep2Type, RegisterStep1Type } from "@/lib/types";
import RegisterStep1Form from "@/components/register/register-step1-form";
import RegisterStep2Form from "@/components/register/register-step2-form";

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleStep1Submit = async () => {
    try {
      await formikStep1.validateForm();
      if (Object.keys(formikStep1.errors).length === 0) {
        toast.success("تم التسجيل بنجاح!");
        setStep(2);
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (err) {
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep2Submit = async (values: RegisterStep2Type) => {
    try {
      await formikStep2.validateForm();
      if (Object.keys(formikStep2.errors).length === 0) {
        setLoading(true);
        const res = await apiClient.auth.register.$post({
          json: {
            ...values,
            ...formikStep1.values,
            dob: formikStep1.values.dob.toLocaleDateString("en-US"),
            idIssuanceDate: formikStep2.values.idIssuanceDate.toLocaleDateString("en-US"),
          },
        });

        if (res.ok) {
          setLoading(false);
          toast.success("تم التسجيل بنجاح!");
          router.push("/login");
        }
      } else {
        setLoading(false);
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  let formikStep1 = useFormik<RegisterStep1Type>({
    initialValues: {
      fullNameAr: "",
      fullNameEn: "",
      gender: false,
      nationality: "",
      // @ts-ignore
      dob: null,
      email: "",
      fax: "",
      phoneNoMain: "",
      phoneNoSec: "",
      hashedPassword: "",
      confirmPassword: "",
      secQuestion: "",
      secAnswer: "",
    },
    validationSchema: RegisterStep1Schema,
    onSubmit: handleStep1Submit,
  });

  let formikStep2 = useFormik<RegisterStep2Type>({
    initialValues: {
      idAuthority: "",
      // @ts-ignore
      idIssuanceDate: null,
      idNumber: "",
      // @ts-ignore
      idType: undefined,
      imageUrl: "",
      isWorking: false,
      militaryStatus: "",
      jobType: "",
      martialStatus: undefined,
    },
    validationSchema: RegisterStep2Schema,
    onSubmit: handleStep2Submit,
  });

  return (
    <>
      <Progress value={step === 1 ? 0 : 50} className="sticky top-0 z-40" />

      {step === 1 && <RegisterStep1Form formik={formikStep1} />}

      {step !== 1 && (
        <RegisterStep2Form goPrevStep={() => setStep(1)} formik={formikStep2} loading={loading} />
      )}

      <Toaster />
    </>
  );
}
