"use client";

import { useEffect, useState } from "react";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import { hcWithType, InferRequestType } from "@repo/mis-api";

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
  });
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    }
  }, [step]);

  return (
    <>
      {step === 1 && (
        <Step1
          onSubmit={handleStepSubmit}
          updateStep={() => setStep((s) => s + 1)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {step !== 1 && (
        <Step2
          onSubmit={handleStepSubmit}
          goNextStep={() => setStep((s) => s + 1)}
          goPrevStep={() => setStep((s) => s - 1)}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
}
