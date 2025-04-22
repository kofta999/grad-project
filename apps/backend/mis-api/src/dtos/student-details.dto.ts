import { z } from "zod";

export const StudentDetailsSchema = z.object({
  studentId: z.number(),
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
  dob: z.string(),
});

export type StudentDetailsDTO = z.infer<typeof StudentDetailsSchema>;
