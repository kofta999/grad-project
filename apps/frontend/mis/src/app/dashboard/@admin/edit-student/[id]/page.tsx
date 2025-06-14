"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import useApplicationDataForAdmin from "@/hooks/use-application-data-for-admin";
import { Progress } from "@radix-ui/react-progress";
import toast, { Toaster } from "react-hot-toast";
import { apiClient } from "@/lib/client";
import { RegisterStep1Type, RegisterStep2Type } from "@/lib/types";
import { RegisterStep1Schema, RegisterStep2Schema } from "@/lib/schemas";
import RegisterStep1Form from "@/components/register/register-step1-form";
import RegisterStep2Form from "@/components/register/register-step2-form";

export default function Page() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { student } = useApplicationDataForAdmin(id);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formik: any, extraData: object = {}, onSuccess?: () => void) => {
    try {
      setLoading(true);
      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0 && student) {
        const res = await apiClient.students[":id"].$patch({
          param: { id: student.studentId.toString() },
          json: {
            ...formik.values,
            ...extraData,
          },
        });
        await res.json();

        if (res.status === 200) {
          setLoading(false);
          toast.success("تم التعديل بنجاح!");
          onSuccess?.();
          window.scrollTo(0, 0);
        }
      } else {
        setLoading(false);
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (error) {
      setLoading(false);
      console.log("Registration failed:", error);
      toast.error("فشل التعديل. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep1Submit = async (values: RegisterStep1Type) => {
    await handleSubmit(
      formikStep1,
      {
        dob: formikStep1.values.dob?.toLocaleDateString("en-US"),
      },
      () => setStep(2)
    );
  };

  const handleStep2Submit = async (values: RegisterStep2Type) => {
    await handleSubmit(
      formikStep2,
      {
        idIssuanceDate: formikStep2.values.idIssuanceDate?.toLocaleDateString("en-US"),
        ...formikStep1.values,
      },
      () => router.push("/dashboard/applications")
    );
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
    validationSchema: RegisterStep1Schema.partial(),
    onSubmit: handleStep1Submit,
  });

  let formikStep2 = useFormik<RegisterStep2Type>({
    initialValues: {
      idAuthority: "",
      // @ts-ignore
      idIssuanceDate: null,
      idNumber: "",
      idType: "national_id",
      imageUrl: "",
      isWorking: false,
      // @ts-ignore
      militaryStatus: "",
      jobType: "",
      martialStatus: "single",
    },
    validationSchema: RegisterStep2Schema.partial(),
    onSubmit: handleStep2Submit,
  });

  useEffect(() => {
    if (student) {
      formikStep1.setValues({
        fullNameAr: student.fullNameAr || "",
        fullNameEn: student.fullNameEn || "",
        gender: student.gender || false,
        nationality: student.nationality || "",
        email: student.email || "",
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
        // @ts-ignore
        militaryStatus: student.militaryStatus || "",
        jobType: student.jobType || "",
        martialStatus: student.martialStatus || "single",
      });
    }
  }, [student]);

  return (
    <>
      <Progress value={((step - 1) / 2) * 100} className="sticky top-0 z-40" />

      {step === 1 && <RegisterStep1Form formik={formikStep1} />}

      {step !== 1 && (
        <RegisterStep2Form
          goPrevStep={() => setStep(1)}
          formikStep1={formikStep1}
          formik={formikStep2}
          loading={loading}
        />
      )}

      <Toaster />
    </>
  );
}
