"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import ApplicationStep1Form from "@/components/application/application-step1-form";
import ApplicationStep2Form from "@/components/application/application-step2-form";
import ApplicationStep3Form from "@/components/application/application-step3-form";
import { Progress } from "@/components/ui/progress";
import {
  ApplicationStep1Schema,
  ApplicationStep2Schema,
  ApplicationStep3Schema,
} from "@/lib/schemas";
import { ApplicationStep2Type, ApplicationStep3Type, ApplicationStep1Type } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/client";
import useUser from "@/hooks/use-user";

export default function Settings() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { applicationData } = useUser();

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
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep2Submit = async (values: ApplicationStep2Type) => {
    try {
      await formikStep2.validateForm();
      if (Object.keys(formikStep2.errors).length === 0) {
        setLoading(true);
        const res = await apiClient.students.me.applications.$patch({
          json: {
            ...values,
            ...formikStep1.values,
            // @ts-ignore
            emergencyContact: formikStep1.values.emergencyContact.name
              ? formikStep1.values.emergencyContact
              : undefined,
            qualification: {
              ...values.qualification,
              date: formikStep2.values.qualification.date.toLocaleDateString("en-US"),
            },
          },
        });

        if (res.ok) {
          const result: { applicationId: number } = await res.json();
          setLoading(false);
          toast.success("تم التسجيل النموذج الثاني بنجاح!");
          setStep(3);
          window.scrollTo(0, 0);
        }
      } else {
        setLoading(false);
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep3Submit = async (values: ApplicationStep3Type) => {
    try {
      await formikStep3.validateForm();
      if (Object.keys(formikStep3.errors).length === 0) {
        setLoading(true);
        const res = await apiClient.students.me.applications[":applicationId"]["attachments"].$post(
          {
            param: {
              applicationId: "",
            },
            json: {
              applicationId: "",
              attachments: values.attachments,
            },
          }
        );

        if (res.ok) {
          await res.json();
          setLoading(false);
          toast.success("تم التسجيل بنجاح!");
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        setLoading(false);
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch {
      setLoading(false);
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  let formikStep1 = useFormik<ApplicationStep1Type>({
    initialValues: {
      permanentAddress: {
        city: "",
        country: "",
        fullAddress: "",
      },
      currentAddress: {
        city: "",
        country: "",
        fullAddress: "",
      },
      emergencyContact: {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
      },
    },
    // validationSchema: ApplicationStep1Schema,
    onSubmit: handleStep1Submit,
  });

  let formikStep2 = useFormik<ApplicationStep2Type>({
    initialValues: {
      qualification: {
        country: "",
        university: "",
        faculty: "",
        type: "",
        qualification: "",
        specialization: "",
        year: "",
        date: new Date(),
        creditHours: false,
        grade: "",
        gpa: 0,
      },
      registration: {
        academicYearId: 0,
        faculty: "",
        academicDegree: "diploma",
        departmentId: 0,
      },
    },
    validationSchema: ApplicationStep2Schema,
    onSubmit: handleStep2Submit,
  });

  let formikStep3 = useFormik<ApplicationStep3Type>({
    initialValues: {
      attachmentType: "",
      // @ts-ignore idk
      attachmentFile: null as File | null,
      attachments: [] as { type: string; attachmentUrl: string }[],
    },
    validationSchema: ApplicationStep3Schema,
    // onSubmit: handleStep3Submit,
  });

  useEffect(() => {
    if (!applicationData) return;

    const {
      addresses = [],
      emergencyContact,
      qualification,
      registration,
      attachments = [],
    } = applicationData;

    const permanentAddress = addresses.find((addr) => addr.type === "permanent") || {};
    const currentAddress = addresses.find((addr) => addr.type === "current") || {};

    formikStep1.setValues({
      permanentAddress: {
        city: permanentAddress.city || "",
        country: permanentAddress.country || "",
        fullAddress: permanentAddress.fullAddress || "",
      },
      currentAddress: {
        city: currentAddress.city || "",
        country: currentAddress.country || "",
        fullAddress: currentAddress.fullAddress || "",
      },
      emergencyContact: {
        name: emergencyContact?.name || "",
        phoneNumber: emergencyContact?.phoneNumber || "",
        email: emergencyContact?.email || "",
        address: emergencyContact?.address || "",
      },
    });

    formikStep2.setValues({
      qualification: {
        country: qualification?.country || "",
        university: qualification?.university || "",
        faculty: qualification?.faculty || "",
        type: qualification?.type || "",
        qualification: qualification?.qualification || "",
        specialization: qualification?.specialization || "",
        year: qualification?.year || "",
        date: qualification?.date ? new Date(qualification.date) : new Date(),
        creditHours: qualification?.creditHours || false,
        grade: qualification?.grade || "",
        gpa: qualification?.gpa || 0,
      },
      registration: {
        academicYearId: registration?.academicYearId || 0,
        faculty: registration?.faculty || "",
        academicDegree: registration?.academicDegree || "diploma",
        departmentId: registration?.departmentId || 0,
      },
    });

    formikStep3.setValues({
      attachmentType: "",
      attachmentFile: null,
      attachments: attachments.map((att) => ({
        type: att.type || "",
        attachmentUrl: att.attachmentUrl || "",
      })),
    });
  }, [applicationData]);

  return (
    <>
      <Progress value={((step - 1) / 3) * 100} className="sticky top-0 z-40" />

      {step === 1 && <ApplicationStep1Form formik={formikStep1} />}

      {step === 2 && (
        <ApplicationStep2Form
          goPrevStep={() => setStep(1)}
          formik={formikStep2}
          // initialData={initialData}
          loading={loading}
        />
      )}

      {step === 3 && (
        <ApplicationStep3Form
          goPrevStep={() => setStep(2)}
          formik={formikStep3}
          loading={loading}
        />
      )}
      <Toaster />
    </>
  );
}
