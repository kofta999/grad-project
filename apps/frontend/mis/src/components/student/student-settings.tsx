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
import { InitialFormDataType } from "@/components/application/application-form";

export default function Settings() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { applicationData } = useUser();
  const applicationId = applicationData?.applicationId;

  const [initialData, setInitialData] = useState<InitialFormDataType>({
    currentAcademicYears: [],
    availableDepartments: [],
  });

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

        const result = await res.json();
        console.log(result);

        if (res.ok) {
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
      if (Object.keys(formikStep3.errors).length === 0 && applicationId) {
        setLoading(true);
        const res = await apiClient.students.me.applications[":applicationId"]["attachments"].$post(
          {
            param: {
              applicationId: applicationId.toString(),
            },
            json: {
              applicationId: applicationId,
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
        attachmentId: number | undefined;
      }[],
    },
    validationSchema: ApplicationStep3Schema,
    onSubmit: handleStep3Submit,
  });

  useEffect(() => {
    setLoading(true);
    if (!applicationData) return;

    const {
      addresses = [],
      emergencyContact,
      qualification,
      registration,
      attachments = [],
    } = applicationData;

    // We can use ! here as the addresses MUST be there, or our backend is broken xd
    const permanentAddress = addresses.find((addr) => addr.type === "permanent")!;
    const currentAddress = addresses.find((addr) => addr.type === "current")!;

    formikStep1.setValues({
      permanentAddress: {
        cityId: permanentAddress.cityId,
        countryId: permanentAddress.countryId,
        fullAddress: permanentAddress.fullAddress,
      },
      currentAddress: {
        cityId: currentAddress.cityId,
        countryId: currentAddress.countryId,
        fullAddress: currentAddress.fullAddress,
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
        countryId: qualification?.countryId,
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
        registerationId: registration?.registerationId || 0,
        academicYearId: registration?.academicYearId || 0,
        faculty: registration?.faculty || "",
        academicDegree: registration?.academicDegree || ("diploma" as const),
        departmentId: registration?.departmentId,
      },
    });

    formikStep3.setValues({
      attachmentType: "",
      attachments: attachments.map((att) => ({
        type: att.type,
        attachmentUrl: att.attachmentUrl,
        attachmentId: att.attachmentId,
      })),
    });
    setLoading(false);
  }, [applicationData]);

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

      {step === 1 && <ApplicationStep1Form formik={formikStep1} loading={loading} />}

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
          applicationId={applicationData?.applicationId}
        />
      )}
      <Toaster />
    </>
  );
}
