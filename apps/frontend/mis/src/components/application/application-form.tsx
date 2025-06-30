"use client";
import { useEffect, useState } from "react";
import { InferResponseType } from "@repo/mis-api";
import { apiClient } from "@/lib/client";
import { Progress } from "@/components/ui/progress";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useApplicationIdContext } from "@/context/application-id-context";
import ApplicationStep1Form from "./application-step1-form";
import ApplicationStep2Form from "./application-step2-form";
import ApplicationStep3Form from "./application-step3-form";
import {
  ApplicationStep1Schema,
  ApplicationStep2Schema,
  ApplicationStep3Schema,
} from "@/lib/schemas";
import { ApplicationStep2Type, ApplicationStep3Type, ApplicationStep1Type } from "@/lib/types";

export type InitialFormDataType = {
  currentAcademicYears: InferResponseType<(typeof apiClient)["academic-years"]["$get"]>;
  availableDepartments: InferResponseType<(typeof apiClient)["departments"]["$get"]>;
};

export default function ApplicationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { applicationId, setApplicationId } = useApplicationIdContext();
  const [initialData, setInitialData] = useState<InitialFormDataType>({
    currentAcademicYears: [],
    availableDepartments: [],
  });

  const handleStep1Submit = async () => {
    try {
      await formikStep1.validateForm();
      if (Object.keys(formikStep1.errors).length === 0) {
        toast.success("تم تسجيل النموذج الاول بنجاح!");
        setStep(2);
        window.scrollTo(0, 0);
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch {
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep2Submit = async (values: ApplicationStep2Type) => {
    try {
      await formikStep2.validateForm();
      if (Object.keys(formikStep2.errors).length === 0) {
        setLoading(true);
        const res = await apiClient.students.me.applications.$post({
          json: {
            ...values,
            ...formikStep1.values,
            // @ts-ignore
            emergencyContact: formikStep1.values.emergencyContact.name
              ? formikStep1.values.emergencyContact
              : undefined,
          },
        });
        if (res.ok) {
          const result: { applicationId: number } = await res.json();
          setLoading(false);
          setApplicationId(result.applicationId);
          toast.success("تم التسجيل النموذج الثاني بنجاح!");
          setStep(3);
          window.scrollTo(0, 0);
        }
      } else {
        setLoading(false);
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch (e) {
      setLoading(false);
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep3Submit = async (values: ApplicationStep3Type) => {
    try {
      await formikStep3.validateForm();
      if (Object.keys(formikStep3.errors).length === 0) {
        if (!applicationId) {
          throw new Error("Application id not found");
        }
        setLoading(true);
        const res = await apiClient.students.me.applications[":applicationId"]["attachments"].$post(
          {
            param: {
              applicationId: applicationId.toString(),
            },
            json: {
              applicationId,
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
        cityId: 0,
        countryId: -1,
        fullAddress: "",
      },
      currentAddress: {
        cityId: 0,
        countryId: -1,
        fullAddress: "",
      },
      emergencyContact: {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
      },
    },
    validationSchema: ApplicationStep1Schema,
    onSubmit: handleStep1Submit,
  });

  let formikStep2 = useFormik<ApplicationStep2Type>({
    initialValues: {
      qualification: {
        countryId: -1,
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
        registerationId: 0,
        departmentId: 0,
        academicYearId: 0,
        faculty: "",
        academicDegree: "diploma",
      },
    },
    validationSchema: ApplicationStep2Schema,
    onSubmit: handleStep2Submit,
  });

  let formikStep3 = useFormik<ApplicationStep3Type>({
    initialValues: {
      attachmentType: "",
      attachments: [] as {
        type: string;
        attachmentUrl: string;
        attachmentId?: number | undefined;
      }[],
    },
    validationSchema: ApplicationStep3Schema,
    onSubmit: handleStep3Submit,
  });

  useEffect(() => {
    const getAcademicYears = async () => {
      const res = await apiClient["academic-years"].$get();
      const data = await res.json();

      setInitialData((prev) => ({ ...prev, currentAcademicYears: data }));
    };
    getAcademicYears();
  }, []);

  useEffect(() => {
    const getAvailableDepartments = async (type: "diploma" | "master" | "phd") => {
      const res = await apiClient.departments.$get({
        query: { type },
      });
      const data = await res.json();

      setInitialData((prev) => ({ ...prev, availableDepartments: data }));
    };
    getAvailableDepartments(formikStep2.values.registration.academicDegree);
  }, [formikStep2.values.registration.academicDegree]);

  return (
    <>
      <Progress value={((step - 1) / 3) * 100} className="sticky top-0 z-40" />

      {step === 1 && <ApplicationStep1Form formik={formikStep1} />}

      {step === 2 && (
        <ApplicationStep2Form
          goPrevStep={() => setStep(1)}
          formik={formikStep2}
          initialData={initialData}
          loading={loading}
        />
      )}

      {step === 3 && (
        <ApplicationStep3Form
          goPrevStep={() => setStep(2)}
          formik={formikStep3}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      <Toaster />
    </>
  );
}
