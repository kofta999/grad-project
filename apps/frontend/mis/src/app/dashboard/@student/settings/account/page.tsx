"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AccountForm from "@/components/account-form";
import { apiClient } from "@/lib/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const validationSchema = Yup.object().shape({
  fullNameAr: Yup.string()
    .matches(/^[\u0621-\u064A\s]+$/, "يُسمح فقط بالحروف العربية والمسافات")
    .required("الاسم بالكامل مطلوب"),
  hashedPassword: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  email: Yup.string()
    .matches(
      /^[\w.-]+@scu\.edu\.org$/,
      "يجب أن يكون البريد الالكتروني الجامعي ينتهي بـ scu.edu.org@"
    )
    .required("البريد الالكتروني مطلوب"),
  phoneNoMain: Yup.string()
    .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب إدخال رقم هاتف صحيح")
    .required("رقم الهاتف الرئيسي مطلوب"),
});

export default function AccountPage() {
  const router = useRouter();
  const { personalData } = useUser();
  const id = personalData?.studentId;

  const submit = async (values: {
    fullNameAr: string;
    hashedPassword: string;
    email: string;
    phoneNoMain: string;
  }) => {
    try {
      const res = await apiClient.students[":id"].$patch({
        param: { id: id.toString() },
        json: values,
      });

      if (res.status === 200) {
        toast.success("تم تحديث البيانات الشخصية");

        await apiClient.auth.logout.$post();

        router.push("/login");
      }
    } catch (err) {
      toast.error("فشل تحديث البيانات الشخصية");
    }
  };

  const formik = useFormik({
    initialValues: {
      fullNameAr: "",
      hashedPassword: "",
      email: "",
      phoneNoMain: "",
    },
    validationSchema,
    onSubmit: submit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (personalData) {
      formik.setValues({
        fullNameAr: personalData.fullNameAr || "",
        hashedPassword: "",
        email: personalData.email || "",
        phoneNoMain: personalData.phoneNoMain || "",
      });
    }
  }, [personalData]);

  return <AccountForm formik={formik} />;
}
