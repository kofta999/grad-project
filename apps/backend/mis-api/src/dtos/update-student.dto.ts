import { z } from "zod";

export const UpdateStudentSchema = z
  .object({
    fullNameAr: z.string(),
    fullNameEn: z.string(),
    gender: z.boolean(),
    email: z.string(),
    nationality: z.string(),
    imageUrl: z.string(),
    phoneNoMain: z.string(),
    phoneNoSec: z.string().nullable(),
    fax: z.string().nullable(),
    idType: z.enum(["national_id", "passport"]),
    idIssuanceDate: z.string(),
    idNumber: z.string(),
    idAuthority: z.string(),
    martialStatus: z
      .enum(["single", "married", "married_with_dependents", "divorced", "widow", "other"])
      .nullable(),
    isWorking: z.boolean(),
    jobType: z.string().nullable(),
    militaryStatus: z.string(),
    createdAt: z.string(),
    dob: z.string(),
    hashedPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .partial();

export type UpdateStudentDTO = z.infer<typeof UpdateStudentSchema>;
