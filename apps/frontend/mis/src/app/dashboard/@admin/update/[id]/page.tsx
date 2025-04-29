"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import useApplicationDataForAdmin from "@/Hooks/useApplicationDataForAdmin";
import Step2 from "@/app/_components/register/step2";
import Step1 from "@/app/_components/register/step1";
import { Progress } from "@radix-ui/react-progress";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { apiClient } from "@/lib/client";

export type FormStep1Type = Yup.InferType<typeof step1Schema>;
export type FormStep2Type = Yup.InferType<typeof step2Schema>;

const step1Schema = Yup.object().shape({
  fullNameAr: Yup.string(),
  fullNameEn: Yup.string(),
  gender: Yup.boolean().required(),
  nationality: Yup.string(),
  dob: Yup.date().typeError("تاريخ الميلاد غير صالح"),
  email: Yup.string().email("البريد الإلكتروني غير صالح"),
  fax: Yup.string().optional(),
  phoneNoMain: Yup.string(),
  phoneNoSec: Yup.string(),
  hashedPassword: Yup.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  confirmPassword: Yup.string()
    .min(8, "تأكيد كلمة المرور يجب أن يكون 8 أحرف على الأقل")
    .oneOf([Yup.ref("hashedPassword")], "كلمة المرور وتأكيدها غير متطابقين"),
  secQuestion: Yup.string(),
  secAnswer: Yup.string(),
});

const step2Schema = Yup.object().shape({
  imageUrl: Yup.string(),
  idType: Yup.string().oneOf(["national_id", "passport"]),
  idIssuanceDate: Yup.date().typeError("تاريخ إصدار الهوية غير صالح"),
  idNumber: Yup.string(),
  idAuthority: Yup.string(),
  martialStatus: Yup.string()
    .oneOf(["single", "married", "married_with_dependents", "divorced", "widow", "other"])
    .optional(),
  isWorking: Yup.boolean(),
  jobType: Yup.string(),
  militaryStatus: Yup.string(),
});

export default function update() {
  const router = useRouter();
  const { id } = useParams();
  const { student } = useApplicationDataForAdmin(id as string);

  const [step, setStep] = useState(1);

  const handleSubmit = async (formik: any, extraData: object = {}, onSuccess?: () => void) => {
    try {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0) {
        const res = await apiClient.students[":id"].$patch({
          param: { id: id.toString() },
          json: {
            ...formik.values,
            ...extraData,
          },
        });
        const result = await res.json();

        {
          /* for testing */
        }
        // if (result.message === `duplicate key value violates unique constraint "students_email_key"`) {
        //   toast.error("الايميل مستخدم من قبل");
        //   return;
        // }

        if (res.status === 200) {
          toast.success("تم التعديل بنجاح!");
          onSuccess?.();
          window.scrollTo(0, 0);
        }
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (error) {
      console.log("Registration failed:", error);
      toast.error("فشل التعديل. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep1Submit = async (values: FormStep1Type) => {
    await handleSubmit(
      formikStep1,
      {
        dob: formikStep1.values.dob.toLocaleDateString("en-US"),
      },
      () => setStep(2)
    );
  };

  const handleStep2Submit = async (values: FormStep2Type) => {
    await handleSubmit(
      formikStep2,
      {
        idIssuanceDate: formikStep2.values.idIssuanceDate.toLocaleDateString("en-US"),
        ...formikStep1.values,
      },
      () => router.push("/dashboard/applications")
    );
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
    // validationSchema: step2Schema,
    onSubmit: handleStep2Submit,
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
