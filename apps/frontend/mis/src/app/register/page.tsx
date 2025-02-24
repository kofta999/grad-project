"use client";

import { useEffect, useState } from "react";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import { hcWithType, InferRequestType } from "@repo/mis-api";
import { Progress } from "@/components/ui/progress";

const client = hcWithType("http://localhost:3000");
export type FormType = InferRequestType<
  typeof client.auth.register.$post
>["json"];

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormType>({
    dob: "",
    email: "",
    fullNameAr: "",
    fullNameEn: "",
    gender: false,
    hashedPassword: "",
    idAuthority: "",
    idIssuanceDate: "",
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
  });
  const [step, setStep] = useState(1);

  const handleStepSubmit = (data: Partial<FormType>) => {
    setFormData((old) => ({ ...old, ...data }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const submit = async () => {
      // Try to submit
      console.log("submitting");

      try {
        const res = await client.auth.register.$post({
          json: formData,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();
        console.log("Registration successful:", result);
        alert("تم التسجيل بنجاح!");
      } catch (err) {
        console.error("Registration failed:", err);
        alert("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
      }
    };

    if (step === 3) {
      submit();
      setStep(2);
    }
  }, [step]);

  return (
    <>
      <Progress value={step === 1 ? 0 : 50} className="sticky top-0 z-10" />

      {step === 1 && (
        <Step1
          onSubmit={handleStepSubmit}
          updateStep={() => setStep(2)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {step !== 1 && (
        <Step2
          onSubmit={handleStepSubmit}
          goNextStep={() => setStep(3)}
          goPrevStep={() => setStep(1)}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
}
