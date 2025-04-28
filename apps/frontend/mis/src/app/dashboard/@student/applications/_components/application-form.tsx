"use client";

import { useEffect, useState } from "react";
import { InferRequestType, InferResponseType } from "@repo/mis-api";
import { apiClient } from "@/lib/client";
import Step1 from "../../../../_components/application/step1";
import Step2 from "../../../../_components/application/step2";
import { Progress } from "@/components/ui/progress";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import Step3 from "../../../../_components/application/step3";
import { useRouter } from "next/navigation";
import { useApplicationIdContext } from "@/context/application-id-context";
import {
  FormStep2Type,
  FormStep3Type,
  FormStep1Type,
  step1Schema,
  step2Schema,
  step3Schema,
} from "../validators";

export type FormType = InferRequestType<typeof apiClient.students.me.applications.$post>["json"];

export type InitialFormDataType = {
  currentAcademicYears: InferResponseType<(typeof apiClient)["academic-years"]["$get"]>;
  availableDepartments: InferResponseType<(typeof apiClient)["departments"]["$get"]>;
};

export default function ApplicationForm() {
  const router = useRouter();
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
        toast.success("تم التسجيل النموذج الاول بنجاح!");
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
        const response = await apiClient.students.me.applications.$post({
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
        if (!response.ok) {
          const result = await response.json();
          console.log(result);
          // @ts-ignore Otherwise I need to explicitly set the type
          throw new Error(result.error);
        } else {
          const result: { applicationId: number } = await response.json();

          setApplicationId(result.applicationId);
        }

        toast.success("تم التسجيل النموذج الثاني بنجاح!");
        setStep(3);
        window.scrollTo(0, 0);
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch {
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleStep3Submit = async (values: FormStep3Type) => {
    try {
      await formikStep3.validateForm();
      if (Object.keys(formikStep3.errors).length === 0) {
        if (!applicationId) {
          throw new Error("Application id not found");
        }

        const response = await apiClient.students.me.applications[":applicationId"][
          "attachments"
        ].$post({
          param: {
            applicationId: applicationId.toString(),
          },
          json: {
            applicationId,
            attachments: values.attachments,
          },
        });
        const result = await response.json();

        if (!response.ok) {
          // @ts-ignore Otherwise I need to explicitly set the type
          throw new Error(result.error);
        }

        toast.success("تم التسجيل بنجاح!");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("الرجاء تصحيح الأخطاء قبل المتابعة.");
      }
    } catch {
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    }
  };

  let formikStep1 = useFormik<FormStep1Type>({
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
    validationSchema: step1Schema,
    onSubmit: handleStep1Submit,
  });

  let formikStep2 = useFormik<FormStep2Type>({
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
    validationSchema: step2Schema,
    onSubmit: handleStep2Submit,
  });

  let formikStep3 = useFormik<FormStep3Type>({
    initialValues: {
      attachmentType: "",
      // @ts-ignore idk
      attachmentFile: null as File | null,
      attachments: [] as { type: string; attachmentUrl: string }[],
    },
    validationSchema: step3Schema,
    onSubmit: handleStep3Submit,
  });

  useEffect(() => {
    const getAcademicYears = async () => {
      const res = await apiClient["academic-years"].$get();

      const data = await res.json();
      console.log(data);

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
      console.log(data);

      setInitialData((prev) => ({ ...prev, availableDepartments: data }));
    };

    getAvailableDepartments(formikStep2.values.registration.academicDegree);
  }, [formikStep2.values.registration.academicDegree]);

  return (
    <>
      <Progress value={((step - 1) / 3) * 100} className="sticky top-0 z-40" />

      {step === 1 && <Step1 formik={formikStep1} />}

      {step === 2 && (
        <Step2 goPrevStep={() => setStep(1)} formik={formikStep2} initialData={initialData} />
      )}

      {step === 3 && <Step3 goPrevStep={() => setStep(2)} formik={formikStep3} />}

      <Toaster />
    </>
  );
}
