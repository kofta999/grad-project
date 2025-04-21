import { ROLES } from "@/lib/constants";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import {
  academicQualifications,
  academicYears,
  addresses,
  adminApplicationsList,
  applications,
  attachments,
  courses,
  detailedCourseRegistrationsView,
  emergencyContacts,
  registerations,
  students,
} from "./schema";

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
    .extend({ year: z.string() })
);

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
    })
  ),
});

export const acceptApplicationSchema = createSelectSchema(applications).omit({
  studentId: true,
  isAdminAccepted: true,
});

export const adminApplicationsListSchema = z.array(createSelectSchema(adminApplicationsList));

const applicationDetailsSchema = z.object({
  applicationId: z.number(),
  isAccepted: z.boolean(),
  addresses: z.array(
    createSelectSchema(addresses).omit({
      applicationId: true,
    })
  ),
  academicQualification: createSelectSchema(academicQualifications).omit({
    applicationId: true,
  }),
  emergencyContact: createSelectSchema(emergencyContacts)
    .omit({
      applicationId: true,
    })
    .nullable(),
  registration: createSelectSchema(registerations)
    .omit({
      applicationId: true,
      departmentId: true,
    })
    .extend({
      academicYear: z.string(),
      academicDegree: z.string(),
      academicProgram: z.string(),
    }),
  attachments: z.array(createSelectSchema(attachments).omit({ applicationId: true })),
});

export const adminApplicationDetailsSchema = z.object({
  student: createSelectSchema(students)
    .omit({
      hashedPassword: true,
      secAnswer: true,
      secQuestion: true,
      updatedAt: true,
    })
    .optional(),
  application: applicationDetailsSchema.optional(),
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
  createSelectSchema(courses).extend({ courseRegistrationId: z.number() })
);

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
  })
);

export const registerCourseSchema = z.object({
  applicationId: z.number().int().positive(),
  courseId: z.number().int().positive(),
  semester: z.enum(["first", "second", "third"]),
});

export const applicantRegisteredCoursesRequestSchemaForStudent = z.object({
  semester: z.enum(["first", "second", "third"]),
  academicYearId: z.coerce.number(),
});

export const applicantRegisteredCoursesResponseSchemaForStudent = z.array(
  createSelectSchema(detailedCourseRegistrationsView)
    .omit({
      academicYearId: true,
      applicationId: true,
      semester: true,
      courseRegistrationId: true,
    })
    .extend({
      grade: z.string().nullable(),
    })
);

export const getStudentSchema = createSelectSchema(students).omit({
  hashedPassword: true,
  secQuestion: true,
  secAnswer: true,
  createdAt: true,
  updatedAt: true,
});

export const submitThesisSchema = z.object({
  title: z.string().min(1),
  attachmentUrl: z.string().url(),
});
