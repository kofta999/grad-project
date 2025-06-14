import { z } from "zod";

export const RegisterStudentSchema = z
  .object({
    fullNameAr: z.string().min(1, "Full name in Arabic is required"),
    fullNameEn: z.string().min(1, "Full name in English is required"),
    gender: z.boolean(),
    email: z.string().email("Invalid email address"),
    nationality: z.string().min(1, "Nationality is required"),
    imageUrl: z.string().url("Invalid URL for image"),
    phoneNoMain: z.string().min(1, "Main phone number is required"),
    phoneNoSec: z.string().optional(),
    fax: z.string().optional(),
    idType: z.enum(["national_id", "passport"]),
    idIssuanceDate: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Invalid date for ID issuance",
    }),
    idNumber: z.string().min(1, "ID number is required"),
    idAuthority: z.string().min(1, "ID authority is required"),
    martialStatus: z
      .enum(["single", "married", "married_with_dependents", "divorced", "widow", "other"])
      .optional(),
    isWorking: z.boolean(),
    jobType: z.string().optional(),
    hashedPassword: z.string().min(8, "Password must be at least 8 characters long"),
    secQuestion: z.string().min(1, "Security question is required"),
    secAnswer: z.string().min(1, "Security answer is required"),
    militaryStatus: z.string().min(1, "Military status is required"),
    dob: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Invalid date of birth",
    }),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.hashedPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterStudentDTO = z.infer<typeof RegisterStudentSchema>;
