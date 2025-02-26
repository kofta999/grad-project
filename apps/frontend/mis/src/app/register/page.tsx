"use client";

import { useEffect, useState } from "react";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import { InferRequestType } from "@repo/mis-api";
import { Progress } from "@/components/ui/progress";
import { apiClient } from "@/lib/client";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from 'yup';
import { useFormik, FormikProps } from 'formik';

export type FormType = InferRequestType<
  typeof apiClient.auth.register.$post
>["json"] & {
  fax?: string;
  dob: Date | null;
  idIssuanceDate: Date | null;
};

export const registerSchema = Yup.object().shape({
  fullNameAr: Yup.string().required("الاسم الكامل بالعربية مطلوب"),
  fullNameEn: Yup.string().required("الاسم الكامل بالإنجليزية مطلوب"),
  gender: Yup.boolean().required(),
  email: Yup.string().email("البريد الإلكتروني غير صالح").required(),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  imageUrl: Yup.string().url("رابط الصورة غير صالح").required(),
  phoneNoMain: Yup.string().required("رقم الهاتف الرئيسي مطلوب"),
  phoneNoSec: Yup.string().optional(),
  idType: Yup.string().oneOf(["national_id", "passport"]).required("نوع الهوية مطلوب"),
  idIssuanceDate: Yup.date()
    .typeError("تاريخ إصدار الهوية غير صالح")
    .required("تاريخ إصدار الهوية مطلوب"),
  idNumber: Yup.string().required("رقم الهوية مطلوب"),
  idAuthority: Yup.string().required("جهة إصدار الهوية مطلوبة"),
  martialStatus: Yup.string()
    .oneOf(["اعزب", "متزوج", "متزوج ويعول", "مطلق", "ارمل", "اخري"])
    .optional(),
  isWorking: Yup.boolean().required(),
  jobType: Yup.string().optional(),
  hashedPassword: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .min(8, "تأكيد كلمة المرور يجب أن يكون 8 أحرف على الأقل")
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("hashedPassword")], "كلمة المرور وتأكيدها غير متطابقين"),
  secQuestion: Yup.string().required("سؤال الأمان مطلوب"),
  secAnswer: Yup.string().required("إجابة سؤال الأمان مطلوبة"),
  militaryStatus: Yup.string().required("حالة الخدمة العسكرية مطلوبة"),
  dob: Yup.date()
  .typeError("تاريخ الميلاد غير صالح")
  .required("تاريخ الميلاد مطلوب"),
});

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormType>({
    dob: null,
    email: "",
    fullNameAr: "",
    fullNameEn: "",
    gender: false,
    hashedPassword: "",
    idAuthority: "",
    idIssuanceDate: null,
    idNumber: "",
    idType: "national_id",
    imageUrl: "",
    isWorking: false,
    militaryStatus: "",
    nationality: "",
    phoneNoMain: "",
    secAnswer: "",
    secQuestion: "",
    phoneNoSec: "",
    confirmPassword: "",
    fax: "",
  });

const handleSubmit = async (values: FormType) => {
  try {
    const res = await apiClient.auth.register.$post({
      json: values,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log("Registration successful:", result);
    toast.success("تم التسجيل بنجاح!");
  } catch (err) {
    console.error("Registration failed:", err);
    toast.error("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
  }
};

  let formik: FormikProps<FormType> = useFormik({
    initialValues: formData,
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });


  return (
    <>
      <Progress value={step === 1 ? 0 : 50} className="sticky top-0 z-40" />

      {step === 1 && (
        <Step1
          updateStep={() => setStep(2)}
          formik={formik}
        />
      )}

      {step !== 1 && (
        <Step2
          goNextStep={() => setStep(3)}
          goPrevStep={() => setStep(1)}
          formData={formData}
          setFormData={setFormData}
          formik={formik}
        />
      )}

      <Toaster />
    </>
  );
}
