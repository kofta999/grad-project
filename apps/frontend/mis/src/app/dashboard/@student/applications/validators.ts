import * as Yup from "yup";

export type FormStep1Type = Yup.InferType<typeof step1Schema>;
export type FormStep2Type = Yup.InferType<typeof step2Schema>;
export type FormStep3Type = Yup.InferType<typeof step3Schema>;

export const step1Schema = Yup.object().shape({
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
    name: Yup.string().required("الاسم مطلوب"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
      .required("رقم الهاتف مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
  }),
});

export const step2Schema = Yup.object().shape({
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
    academicYearId: Yup.number().required("السنة الدراسية مطلوبة").min(1),
    faculty: Yup.string().required("الكلية مطلوبة"),
    academicDegree: Yup.string()
      .oneOf(["diploma", "master", "phd"])
      .required("الدرجة الأكاديمية مطلوبة"),
    departmentId: Yup.number().min(1).required("البرنامج الأكاديمي مطلوب"),
  }),
});

export const step3Schema = Yup.object().shape({
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
