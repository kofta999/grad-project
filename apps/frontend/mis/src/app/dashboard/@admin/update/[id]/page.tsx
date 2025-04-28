"use client"
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import useApplicationDataForAdmin from "@/Hooks/useApplicationDataForAdmin";
import { useRouter } from "next/navigation";
import Step2 from "@/app/_components/register/step2";
import Step1 from "@/app/_components/register/step1";
import { Progress } from "@radix-ui/react-progress";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { apiClient } from "@/lib/client";

export type FormStep1Type = Yup.InferType<typeof step1Schema>;
export type FormStep2Type = Yup.InferType<typeof step2Schema>;

const step1Schema = Yup.object().shape({
  fullNameAr: Yup.string().required("الاسم الكامل بالعربية مطلوب"),
  fullNameEn: Yup.string().required("الاسم الكامل بالإنجليزية مطلوب"),
  gender: Yup.boolean().required(),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  dob: Yup.date().typeError("تاريخ الميلاد غير صالح").required("تاريخ الميلاد مطلوب"),
  email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني غير صالح"),
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
  idType: Yup.string().oneOf(["national_id", "passport"]).required("نوع الهوية مطلوب"),
  idIssuanceDate: Yup.date()
    .typeError("تاريخ إصدار الهوية غير صالح")
    .required("تاريخ إصدار الهوية مطلوب"),
  idNumber: Yup.string().required("رقم الهوية مطلوب"),
  idAuthority: Yup.string().required("جهة إصدار الهوية مطلوبة"),
  martialStatus: Yup.string()
    .oneOf(["single", "married", "married_with_dependents", "divorced", "widow", "other"])
    .optional(),
  isWorking: Yup.boolean().required(),
  jobType: Yup.string().optional(),
  militaryStatus: Yup.string().required("حالة الخدمة العسكرية مطلوبة"),
});

export default function update() {
  const router = useRouter();
  const { id } = useParams();
  const { student } = useApplicationDataForAdmin(id as string);

  const [step, setStep] = useState(1);

  const handleStep1Submit = async () => {
    try {
      await formikStep1.validateForm();
      if (Object.keys(formikStep1.errors).length === 0) {
        toast.success("تم تعديل النموذج الاول بنجاح!");
        setStep(2);
        window.scrollTo(0, 0);
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch {
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep2Submit = async (values: FormStep2Type) => {
    try {
      await formikStep2.validateForm();
      if (Object.keys(formikStep2.errors).length === 0) {
        const res = await apiClient.students[":id"].$patch({
          param: { id },
          json: {
            ...formikStep1.values,
            ...values,
            dob: formikStep1.values.dob.toLocaleDateString("en-US"),
            idIssuanceDate: formikStep2.values.idIssuanceDate.toLocaleDateString("en-US"),
          },
        });

        if (res.status === 200) {
          const result = await res.json();
          console.log("Update successful:", result);
          toast.success("تم التعديل بنجاح!");
          await apiClient.auth.logout.$post();
          router.push("/login");
        }
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("فشل التعديل. الرجاء المحاولة مرة أخرى.");
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
    // validationSchema: step1Schema,
    onSubmit: handleStep1Submit
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
    // validationSchema: step2Schema,
    onSubmit: handleStep2Submit
  });

  useEffect(() => {
    if (student) {
      formikStep1.setValues({
        fullNameAr: student.fullNameAr || "",
        fullNameEn: student.fullNameEn || "",
        gender: student.gender || false,
        nationality: student.nationality || "",
        // @ts-ignore
        dob: student.dob ? new Date(student.dob) : null,
        email: student.email || "",
        fax: student.fax || "",
        phoneNoMain: student.phoneNoMain || "",
        phoneNoSec: student.phoneNoSec || "",
        hashedPassword: "",
        confirmPassword: "",
        secQuestion: "",
        secAnswer: "",
      });

      formikStep2.setValues({
        idAuthority: student.idAuthority || "",
        // @ts-ignore
        idIssuanceDate: student.idIssuanceDate ? new Date(student.idIssuanceDate) : null,
        idNumber: student.idNumber || "",
        idType: student.idType || "national_id",
        imageUrl: student.imageUrl || "",
        isWorking: student.isWorking || false,
        militaryStatus: student.militaryStatus || "",
        jobType: student.jobType || "",
        martialStatus: student.martialStatus || "single",
      });
    }
  }, [student]);


  return (
    <>
      <Progress value={step === 1 ? 0 : 50} className="sticky top-0 z-40" />

      {step === 1 && <Step1 formik={formikStep1} />}

      {step !== 1 && <Step2 goPrevStep={() => setStep(1)} formik={formikStep2} />}

      <Toaster />
    </>
  );
}