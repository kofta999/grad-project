"use client";

import { useEffect, useState } from "react";
import { InferRequestType, InferResponseType } from "@repo/mis-api";
import { apiClient } from "@/lib/client";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import { useApplicationIdContext } from "./application-id-context";
import toast, { Toaster } from "react-hot-toast";

export type FormType = InferRequestType<
  typeof apiClient.student.applications.$post
>["json"];

export type InitialFormDataType = {
  currentAcademicYears: InferResponseType<
    typeof apiClient.student.applications.currentAcademicYears.$get
  >;
  availableDepartments: InferResponseType<
    typeof apiClient.student.applications.availableDepartments.$get
  >;
};

export default function ApplicationForm1() {
  const { setApplicationId } = useApplicationIdContext();
  const [initialData, setInitialData] = useState<InitialFormDataType>({
    currentAcademicYears: [],
    availableDepartments: [],
  });

  // State for form data
  const [formData, setFormData] = useState<FormType>({
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
    qualification: {
      country: "",
      university: "",
      faculty: "",
      type: "",
      qualification: "",
      specialization: "",
      year: "",
      date: "",
      creditHours: false,
      grade: "",
      gpa: "",
    },
    registration: {
      academicYearId: 0,
      faculty: "",
      academicDegree: "diploma",
      departmentId: 0,
    },
  });
  const [step, setStep] = useState(1);

  // const handleStepSubmit = (data: Partial<FormType>) => {
  //   setFormData((old) => ({ ...old, ...data }));
  // };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const submit = async () => {
      // Try to submit
      console.log("submitting");

      try {
        const res = await apiClient.student.applications.$post({
          json: formData,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();
        setApplicationId(result.applicationId);
        console.log("Registration successful:", result);
        toast.success("تم التسجيل بنجاح!");
      } catch (err) {
        console.error("Registration failed:", err);
        toast.error("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
      }
    };

    if (step === 3) {
      submit();
      setStep(2);
    } else {
      window.scrollTo(0, 0);
    }
  }, [step]);

  useEffect(() => {
    const getAcademicYears = async () => {
      const res =
        await apiClient.student.applications.currentAcademicYears.$get();

      const data = await res.json();

      setInitialData((prev) => ({ ...prev, currentAcademicYears: data }));
    };

    getAcademicYears();
  }, []);

  useEffect(() => {
    const getAvailableDepartments = async (
      type: FormType["registration"]["academicDegree"],
    ) => {
      const res =
        await apiClient.student.applications.availableDepartments.$get({
          query: { type },
        });

      const data = await res.json();

      setInitialData((prev) => ({ ...prev, availableDepartments: data }));
    };

    getAvailableDepartments(formData.registration.academicDegree);
  }, [formData.registration.academicDegree]);

  return (
    <>
      {step === 1 && (
        <Step1
          // onSubmit={handleStepSubmit}
          updateStep={() => setStep(2)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {step !== 1 && (
        <Step2
          // onSubmit={handleStepSubmit}
          goNextStep={() => setStep(3)}
          goPrevStep={() => setStep(1)}
          initialData={initialData}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      <Toaster />
    </>
  );
}
