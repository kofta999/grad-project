import * as Yup from "yup";

export const RegisterStep1Schema = Yup.object().shape({
  fullNameAr: Yup.string().required("الاسم الكامل بالعربية مطلوب"),
  fullNameEn: Yup.string().required("الاسم الكامل بالإنجليزية مطلوب"),
  gender: Yup.boolean().required(),
  nationality: Yup.string().required("الجنسية مطلوبة"),
  dob: Yup.date().typeError("تاريخ الميلاد غير صالح").required("تاريخ الميلاد مطلوب"),
  email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني غير صالح"),
  fax: Yup.string().optional(),
  phoneNoMain: Yup.string().required("رقم الهاتف الرئيسي مطلوب"),
  phoneNoSec: Yup.string().optional(),
  hashedPassword: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .min(8, "تأكيد كلمة المرور يجب أن يكون 8 أحرف على الأقل")
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("hashedPassword")], "كلمة المرور وتأكيدها غير متطابقين"),
  secQuestion: Yup.string().required("سؤال الأمان مطلوب"),
  secAnswer: Yup.string().required("إجابة سؤال الأمان مطلوبة"),
});

export const RegisterStep2Schema = Yup.object().shape({
  // Will not use url() because its too strict the errors even if the link is correct
  // Trust me on this one lil bro
  imageUrl: Yup.string().required("الصورة الشخصية مطلوبة"),
  idType: Yup.string().oneOf(["national_id", "passport"]).required("نوع الهوية مطلوب"),
  idIssuanceDate: Yup.date()
    .typeError("تاريخ إصدار الهوية غير صالح")
    .required("تاريخ إصدار الهوية مطلوب"),
  idNumber: Yup.string().required("رقم الهوية مطلوب"),
  idAuthority: Yup.string().required("جهة إصدار الهوية مطلوبة"),
  martialStatus: Yup.string()
    .oneOf(["single", "married", "married_with_dependents", "divorced", "widow", "other"])
    .optional(),
  isWorking: Yup.boolean().required(),
  jobType: Yup.string().optional(),
  militaryStatus: Yup.string().required("حالة الخدمة العسكرية مطلوبة"),
});

export const ApplicationStep1Schema = Yup.object().shape({
  permanentAddress: Yup.object().shape({
    cityId: Yup.number().required("المدينة مطلوبة"),
    countryId: Yup.number().required("الدولة مطلوبة"),
    fullAddress: Yup.string().required("العنوان الكامل مطلوب"),
  }),
  currentAddress: Yup.object().shape({
    cityId: Yup.number().required("المدينة مطلوبة"),
    countryId: Yup.number().required("الدولة مطلوبة"),
    fullAddress: Yup.string().required("العنوان الكامل مطلوب"),
  }),
  emergencyContact: Yup.object().shape(
    {
      name: Yup.string().when(["phoneNumber", "email", "address"], {
        // @ts-ignore
        is: (phoneNumber, email, address) => phoneNumber || email || address,
        then: (schema) => schema.required("الاسم مطلوب"),
        otherwise: (schema) => schema,
      }),
      phoneNumber: Yup.string().when(["name", "email", "address"], {
        // @ts-ignore
        is: (name, email, address) => name || email || address,
        then: (schema) =>
          schema
            .matches(/^\d+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
            .required("رقم الهاتف مطلوب"),
        otherwise: (schema) => schema.matches(/^\d+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط"),
      }),
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .when(["name", "phoneNumber", "address"], {
          // @ts-ignore
          is: (name, phoneNumber, address) => name || phoneNumber || address,
          then: (schema) => schema.required("البريد الإلكتروني مطلوب"),
          otherwise: (schema) => schema,
        }),
      address: Yup.string().when(["name", "phoneNumber", "email"], {
        // @ts-ignore
        is: (name, phoneNumber, email) => name || phoneNumber || email,
        then: (schema) => schema.required("العنوان مطلوب"),
        otherwise: (schema) => schema,
      }),
    },
    [
      ["name", "phoneNumber"],
      ["name", "email"],
      ["name", "address"],
      ["phoneNumber", "email"],
      ["phoneNumber", "address"],
      ["email", "address"],
    ]
  ),
});

export const ApplicationStep2Schema = Yup.object().shape({
  qualification: Yup.object().shape({
    countryId: Yup.number().required("الدولة مطلوبة"),
    university: Yup.string().required("الجامعة مطلوبة"),
    faculty: Yup.string().required("الكلية مطلوبة"),
    type: Yup.string().required("النوع مطلوب"),
    qualification: Yup.string().required("المؤهل مطلوب"),
    specialization: Yup.string().required("التخصص مطلوب"),
    year: Yup.string().required("العام مطلوب"),
    date: Yup.date().required("التاريخ مطلوب"),
    creditHours: Yup.boolean().required("نوع الدراسة مطلوب"),
    grade: Yup.string().required("التقدير مطلوب"),
    gpa: Yup.number()
      .typeError("يجب أن يكون المعدل التراكمي رقماً")
      .required("المعدل التراكمي مطلوب")
      .when("creditHours", {
        is: true,
        then: (schema) =>
          schema
            .min(0, "يجب ألا يقل المعدل التراكمي عن 0")
            .max(4, "يجب ألا يتجاوز المعدل التراكمي عن 4"),
        otherwise: (schema) =>
          schema
            .min(0, "يجب ألا يقل المعدل التراكمي عن 0")
            .max(100, "يجب ألا يتجاوز المعدل التراكمي عن 100"),
      }),
  }),
  registration: Yup.object().shape({
    academicYearId: Yup.number().required("السنة الدراسية مطلوبة").min(1, "السنة الدراسية مطلوبة"),
    faculty: Yup.string().required("الكلية مطلوبة"),
    academicDegree: Yup.string()
      .oneOf(["diploma", "master", "phd"])
      .required("الدرجة الأكاديمية مطلوبة"),
    departmentId: Yup.number()
      .min(1, "البرنامج الاكاديمي مطلوب")
      .required("البرنامج الأكاديمي مطلوب"),
  }),
});

export const ApplicationStep3Schema = Yup.object().shape({
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
    })
  ).required(),
});
