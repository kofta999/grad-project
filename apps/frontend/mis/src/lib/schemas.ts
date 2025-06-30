import * as Yup from "yup";

export const RegisterStep1Schema = Yup.object().shape({
  fullNameAr: Yup.string()
    .required("الاسم الكامل بالعربية مطلوب")
    .test("is-four-words", "الاسم الكامل يجب أن يكون رباعي بالعربية فقط)", (value) => {
      if (!value) return false;

      const arabicOnlyRegex = /^[\u0600-\u06FF\s]+$/;
      if (!arabicOnlyRegex.test(value.trim())) return false;

      const regex = /عبد\s+(ال)?\S+|\S+/g;
      const matches = value.trim().match(regex);

      return matches && matches.length === 4 ? true : false;
    }),
  fullNameEn: Yup.string()
    .required("الاسم الكامل بالإنجليزية مطلوب")
    .test("is-four-words", "الاسم الكامل يجب أن يكون رباعي بالإنجليزية فقط", (value) => {
      if (!value) return false;

      const englishOnlyRegex = /^[A-Za-z\s]+$/;
      if (!englishOnlyRegex.test(value.trim())) return false;

      const words = value.trim().split(/\s+/);
      return words.length === 4;
    }),
  gender: Yup.boolean().required("الجنس مطلوب"),
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
  isWorking: Yup.boolean().required("حالة العمل مطلوبة"),
  jobType: Yup.string().optional(),
  militaryStatus: Yup.string()
    .oneOf(["completed", "postponed", "permanent-exempt", "required", "not-requested"])
    .required("حالة الخدمة العسكرية مطلوبة"),
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
    registerationId: Yup.number().optional(),
    departmentId: Yup.number().required("البرنامج الاكاديمي مطلوب"),
    academicYearId: Yup.number().required("السنة الدراسية مطلوبة"),
    faculty: Yup.string().required("الكلية مطلوبة"),
    academicDegree: Yup.string()
      .oneOf(["diploma", "master", "phd"])
      .required("الدرجة الأكاديمية مطلوبة"),
  }),
});

export const ApplicationStep3Schema = Yup.object().shape({
  attachmentType: Yup.string().required("نوع الهوية مطلوب"),
  attachments: Yup.array(
    Yup.object({
      type: Yup.string().required(),
      attachmentUrl: Yup.string().required(),
      attachmentId: Yup.number().optional(),
    })
  ).required(),
});
