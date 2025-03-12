"use client";

import { useEffect, useState } from "react";
import { InferRequestType, InferResponseType } from "@repo/mis-api";
import { apiClient } from "@/lib/client";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import { Progress } from "@/components/ui/progress";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Step3 from "./_components/step3";
import { useRouter } from "next/navigation";
import { useApplicationIdContext } from "../../context/application-id-context";

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

export type FormStep1Type = Yup.InferType<typeof step1Schema>;
export type FormStep2Type = Yup.InferType<typeof step2Schema>;
export type FormStep3Type = Yup.InferType<typeof step3Schema>;

const step1Schema = Yup.object().shape({
  permanentAddress: Yup.object().shape({
    city: Yup.string().required("المدينة مطلوبة"),
    country: Yup.string().required("الدولة مطلوبة"),
    fullAddress: Yup.string().required("العنوان الكامل مطلوب"),
  }),
  currentAddress: Yup.object().shape({
    city: Yup.string().required("المدينة مطلوبة"),
    country: Yup.string().required("الدولة مطلوبة"),
    fullAddress: Yup.string().required("العنوان الكامل مطلوب"),
  }),
  emergencyContact: Yup.object().shape({
    name: Yup.string(),
    phoneNumber: Yup.string().matches(
      /^\d+$/,
      "يجب أن يحتوي رقم الهاتف على أرقام فقط",
    ),
    email: Yup.string().email("البريد الإلكتروني غير صالح"),
    address: Yup.string(),
  }),
});

const step2Schema = Yup.object().shape({
  qualification: Yup.object().shape({
    country: Yup.string().required("الدولة مطلوبة"),
    university: Yup.string().required("الجامعة مطلوبة"),
    faculty: Yup.string().required("الكلية مطلوبة"),
    type: Yup.string().required("النوع مطلوب"),
    qualification: Yup.string().required("المؤهل مطلوب"),
    specialization: Yup.string().required("التخصص مطلوب"),
    year: Yup.string().required("العام مطلوب"),
    date: Yup.date().required("التاريخ مطلوب"),
    creditHours: Yup.boolean().required("عدد الساعات المعتمدة مطلوب"),
    grade: Yup.string().required("التقدير مطلوب"),
    gpa: Yup.number()
      .min(0, "يجب ألا يقل المعدل التراكمي عن 0")
      .max(4, "يجب ألا يتجاوز المعدل التراكمي 4")
      .required("المعدل التراكمي مطلوب"),
  }),
  registration: Yup.object().shape({
    academicYear: Yup.string().required("السنة الدراسية مطلوبة"),
    faculty: Yup.string().required("الكلية مطلوبة"),
    academicDegree: Yup.string().required("الدرجة الأكاديمية مطلوبة"),
    academicProgram: Yup.string().required("البرنامج الأكاديمي مطلوب"),
  }),
});

const step3Schema = Yup.object().shape({
  attachmentType: Yup.string().required("نوع الهوية مطلوب"),
  attachmentFile: Yup.mixed()
    .required("الملف مطلوب")
    .test("fileSize", "يجب أن لا يزيد الملف عن 2 ميجا بايت", (value) => {
      if (!value) return false;
      return (value as File).size <= 2 * 1024 * 1024;
    }),
  attachments: Yup.array(
    Yup.object({
      type: Yup.string().required(),
      attachmentUrl: Yup.string().required(),
    }),
  ).required(),
});

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
        const response = await apiClient.applications.$post({
          json: {
            ...values,
            ...formikStep1.values,
            qualification: {
              ...values.qualification,
              date: formikStep2.values.qualification.date.toLocaleDateString(
                "en-US",
              ),
            },
          },
        });
        const result = await response.json();
        if (!response.ok) {
          console.log(result);
          throw new Error(result.error);
        }

        setApplicationId(result.applicationId);

        toast.success("تم التسجيل النموذج الثاني بنجاح!");
        setStep(3);
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

        const response = await apiClient.applications.attachments.$post({
          json: {
            applicationId,
            attachments: values.attachments,
          },
        });
        const result = await response.json();

        if (!response.ok) {
          console.log(result);
          throw new Error(result.error);
        }

        toast.success("تم التسجيل بنجاح!");
        router.push("/login");
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
        academicYear: "",
        faculty: "",
        academicDegree: "",
        academicProgram: "",
      },
    },
    validationSchema: step2Schema,
    onSubmit: handleStep2Submit,
  });

  let formikStep3 = useFormik<FormStep3Type>({
    initialValues: {
      attachmentType: "",
      attachmentFile: null as File | null,
      attachments: [] as { type: string; attachmentUrl: string }[],
    },
    validationSchema: step3Schema,
    onSubmit: handleStep3Submit,
  });

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

    getAvailableDepartments(formikStep2.values.registration.academicDegree);
  }, [formikStep2.values.registration.academicDegree]);

  // const handleStepSubmit = (data: Partial<FormType>) => {
  //   setFormData((old) => ({ ...old, ...data }));
  // };

  // useEffect(() => {
  //   const submit = async () => {
  //     // Try to submit
  //     console.log("submitting");

  //     try {
  //       const res = await apiClient.student.applications.$post({
  //         json: formData,
  //       });

  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }

  //       const result = await res.json();
  //       setApplicationId(result.applicationId);
  //       console.log("Registration successful:", result);
  //       toast.success("تم التسجيل بنجاح!");
  //     } catch (err) {
  //       console.error("Registration failed:", err);
  //       toast.error("فشل التسجيل. الرجاء المحاولة مرة أخرى.");
  //     }
  //   };

  //   if (step === 3) {
  //     submit();
  //     setStep(2);
  //   } else {
  //     window.scrollTo(0, 0);
  //   }
  // }, [step]);

  return (
    <>
      <Progress value={((step - 1) / 3) * 100} className="sticky top-0 z-40" />

      {step === 1 && <Step1 formik={formikStep1} />}

      {step === 2 && (
        <Step2
          goPrevStep={() => setStep(1)}
          formik={formikStep2}
          initialData={initialData}
        />
      )}

      {step === 3 && (
        <Step3 goPrevStep={() => setStep(2)} formik={formikStep3} />
      )}

      <Toaster />
    </>
  );
}
