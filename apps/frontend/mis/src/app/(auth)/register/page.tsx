"use client";
import { useState } from "react";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import { InferRequestType } from "@repo/mis-api";
import { Progress } from "@/components/ui/progress";
import { apiClient } from "@/lib/client";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";

export type FormType = InferRequestType<
  typeof apiClient.auth.register.$post
>["json"];

export type FormStep1Type = Yup.InferType<typeof step1Schema>;
export type FormStep2Type = Yup.InferType<typeof step2Schema>;

const step1Schema = Yup.object().shape({
  fullNameAr: Yup.string().required("الاسم الكامل بالعربية مطلوب"),
  fullNameEn: Yup.string().required("الاسم الكامل بالإنجليزية مطلوب"),
  gender: Yup.boolean().required(),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  dob: Yup.date()
    .typeError("تاريخ الميلاد غير صالح")
    .required("تاريخ الميلاد مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني غير صالح"),
  fax: Yup.string().optional(),
  phoneNoMain: Yup.string().required("رقم الهاتف الرئيسي مطلوب"),
  phoneNoSec: Yup.string().optional(),
  hashedPassword: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .min(8, "تأكيد كلمة المرور يجب أن يكون 8 أحرف على الأقل")
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("hashedPassword")], "كلمة المرور وتأكيدها غير متطابقين"),
  secQuestion: Yup.string().required("سؤال الأمان مطلوب"),
  secAnswer: Yup.string().required("إجابة سؤال الأمان مطلوبة"),
});

const step2Schema = Yup.object().shape({
  // Will not use url() because its too strict the errors even if the link is correct
  // Trust me on this one lil bro
  imageUrl: Yup.string().required("الصورة الشخصية مطلوبة"),
  idType: Yup.string()
    .oneOf(["national_id", "passport"])
    .required("نوع الهوية مطلوب"),
  idIssuanceDate: Yup.date()
    .typeError("تاريخ إصدار الهوية غير صالح")
    .required("تاريخ إصدار الهوية مطلوب"),
  idNumber: Yup.string().required("رقم الهوية مطلوب"),
  idAuthority: Yup.string().required("جهة إصدار الهوية مطلوبة"),
  martialStatus: Yup.string()
    .oneOf([
      "single",
      "married",
      "married_with_dependents",
      "divorced",
      "widow",
      "other",
    ])
    .optional(),
  isWorking: Yup.boolean().required(),
  jobType: Yup.string().optional(),
  militaryStatus: Yup.string().required("حالة الخدمة العسكرية مطلوبة"),
});

export default function RegistrationForm() {
  const [step, setStep] = useState(1);

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
            idIssuanceDate:
              formikStep2.values.idIssuanceDate.toLocaleDateString("en-US"),
          },
        });

        const result = await res.json();
        console.log("Registration successful:", result);
        toast.success("تم التسجيل بنجاح!");
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
    validationSchema: step1Schema,
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
    validationSchema: step2Schema,
    onSubmit: handleStep2Submit,
  });

  return (
    <>
      <Progress value={step === 1 ? 0 : 50} className="sticky top-0 z-40" />

      {step === 1 && <Step1 formik={formikStep1} />}

      {step !== 1 && (
        <Step2 goPrevStep={() => setStep(1)} formik={formikStep2} />
      )}

      <Toaster />
    </>
  );
}
