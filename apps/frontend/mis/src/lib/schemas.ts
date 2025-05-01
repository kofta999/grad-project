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
