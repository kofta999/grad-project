"use client";
import { useState } from "react";
import Step1 from "../../_components/register/step1";
import Step2 from "../../_components/register/step2";
import { InferRequestType } from "@repo/mis-api";
import { Progress } from "@/components/ui/progress";
import { apiClient } from "@/lib/client";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { RegisterStep1Schema, RegisterStep2Schema } from "@/lib/schemas";
import { FormStep2Type, FormStep1Type } from "@/lib/types";

export type FormType = InferRequestType<typeof apiClient.auth.register.$post>["json"];

export default function RegistrationForm() {
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

  const handleStep2Submit = async (values: FormStep2Type) => {
    try {
      await formikStep2.validateForm();
      if (Object.keys(formikStep2.errors).length === 0) {
        const res = await apiClient.auth.register.$post({
          json: {
            ...values,
            ...formikStep1.values,
            dob: formikStep1.values.dob.toLocaleDateString("en-US"),
            idIssuanceDate: formikStep2.values.idIssuanceDate.toLocaleDateString("en-US"),
          },
        });

        const result = await res.json();
        console.log("Registration successful:", result);
        toast.success("تم التسجيل بنجاح!");
        router.push("/login");
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  let formikStep1 = useFormik<FormStep1Type>({
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

  let formikStep2 = useFormik<FormStep2Type>({
    initialValues: {
      idAuthority: "",
      // @ts-ignore
      idIssuanceDate: null,
      idNumber: "",
      idType: "national_id",
      imageUrl: "",
      isWorking: false,
      militaryStatus: "",
      jobType: "",
      martialStatus: "single",
    },
    validationSchema: RegisterStep2Schema,
    onSubmit: handleStep2Submit,
  });

  return (
    <>
      <Progress value={step === 1 ? 0 : 50} className="sticky top-0 z-40" />

      {step === 1 && <Step1 formik={formikStep1} />}

      {step !== 1 && <Step2 goPrevStep={() => setStep(1)} formik={formikStep2} />}

      <Toaster />
    </>
  );
}
