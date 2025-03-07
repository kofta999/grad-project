import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import {
  academicQualifications,
  academicYears,
  addresses,
  adminApplicationsList,
  applications,
  attachments,
  detailedCourseRegistrationsView,
  emergencyContacts,
  registerations,
  students,
  courses,
} from "./schema";
import { z } from "zod";
import { ROLES } from "@/lib/constants";

// Won't use drizzle magic here because it's not worth omitting all fields for only email and pass
export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be 6 characters or more"),
  role: z.enum(ROLES),
});

// export const registerSchema = createInsertSchema(students, {

// }).omit({
//   studentId: true,
//   createdAt: true,
//   updatedAt: true,
// });

export const currentAcademicYearsSchema = z.array(
  createSelectSchema(academicYears)
    .omit({ endDate: true, startDate: true })
    .extend({ year: z.string() }),
);

export const registerSchema = createInsertSchema(students, {
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
  idIssuanceDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date for ID issuance",
  }),
  idNumber: z.string().min(1, "ID number is required"),
  idAuthority: z.string().min(1, "ID authority is required"),
  martialStatus: z
    .enum([
      "single",
      "married",
      "married_with_dependents",
      "divorced",
      "widow",
      "other",
    ])
    .optional(),
  isWorking: z.boolean(),
  jobType: z.string().optional(),
  hashedPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  secQuestion: z.string().min(1, "Security question is required"),
  secAnswer: z.string().min(1, "Security answer is required"),
  militaryStatus: z.string().min(1, "Military status is required"),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date of birth",
  }),
})
  .omit({
    studentId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  });

export const applicationSchema = z.object({
  permanentAddress: createInsertSchema(addresses).omit({
    addressId: true,
    applicationId: true,
    type: true,
  }),
  currentAddress: createInsertSchema(addresses).omit({
    addressId: true,
    applicationId: true,
    type: true,
  }),
  emergencyContact: createInsertSchema(emergencyContacts)
    .omit({ applicationId: true, contactId: true })
    .optional(),
  qualification: createInsertSchema(academicQualifications).omit({
    applicationId: true,
    qualificationId: true,
  }),
  registration: createInsertSchema(registerations).omit({
    registerationId: true,
    applicationId: true,
  }),
});

export const attachmentsSchema = z.object({
  applicationId: z.number(),
  attachments: z.array(
    createInsertSchema(attachments).omit({
      attachmentId: true,
      applicationId: true,
    }),
  ),
});

export const acceptApplicationSchema = createSelectSchema(applications).omit({
  studentId: true,
  isAdminAccepted: true,
});

export const adminApplicationsListSchema = z.array(
  createSelectSchema(adminApplicationsList),
);

const applicationDetailsSchema = z.object({
  applicationId: z.number(),
  isAccepted: z.boolean(),
  addresses: z.array(
    createSelectSchema(addresses).omit({
      applicationId: true,
    }),
  ),
  academicQualification: createSelectSchema(academicQualifications).omit({
    applicationId: true,
  }),
  emergencyContact: createSelectSchema(emergencyContacts).omit({
    applicationId: true,
  }),
  registration: createSelectSchema(registerations).omit({
    applicationId: true,
  }),
  attachments: z.array(
    createSelectSchema(attachments).omit({ applicationId: true }),
  ),
});

export const adminApplicationDetailsSchema = z.object({
  student: createSelectSchema(students).omit({
    hashedPassword: true,
    secAnswer: true,
    secQuestion: true,
    updatedAt: true,
  }),
  application: applicationDetailsSchema,
});

export const studentApplicationDetailsSchema = z.object({
  application: applicationDetailsSchema,
});

export const editStudentInfoSchema = createUpdateSchema(students).omit({
  studentId: true,
  createdAt: true,
  updatedAt: true,
});

export const AvailableCoursesSchema = z.object({
  application_id: z.number().int().positive(),
});

export const availableCoursesSchema = z.array(
  z.object({
    course_id: z.number().int(),
    code: z.string(),
    title: z.string(),
    prerequisite: z.string().nullable(),
    total_hours: z.number().int(),
  }));

export const applicantRegisteredCoursesRequestSchema = z.object({
  applicationId: z.number(),
  semester: z.enum(["first", "second", "third"]),
  academicYearId: z.number(),
});

export const applicantRegisteredCoursesResponseSchema = z.array(
  createSelectSchema(detailedCourseRegistrationsView).omit({
    academicYearId: true,
    applicationId: true,
    semester: true,
  }),
);
