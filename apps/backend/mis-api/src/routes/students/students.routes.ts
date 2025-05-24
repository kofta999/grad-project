import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  createErrorSchema,
  createMessageObjectSchema,
  IdParamsSchema,
} from "stoker/openapi/schemas";
import { StudentDetailsSchema } from "@/dtos/student-details.dto";
import { CourseSchema } from "@/dtos/registered-course.dto";
import { SEMESTERS, NotFoundSchema, studentMiddleware, adminMiddleware } from "@/lib/constants";
import { AcademicYearSchema } from "@/dtos/academic-year.dto.";
import { CreateApplicationSchema } from "@/dtos/create-application.dto";
import { SaveAttachmentsSchema } from "@/dtos/save-attachment.dto";
import { ApplicationDetailsSchema } from "@/dtos/application-details.dto";
import { GetThesisSchema } from "@/dtos/get-thesis.dto";
import { UpdateApplicationSchema } from "@/dtos/update-application.dto";

const tags = ["Students"];

// Profile Routes
export const getStudentDetails = createRoute({
  path: "/me",
  method: "get",
  middleware: studentMiddleware,
  tags,
  summary: "View Profile", // ملخص: عرض الملف الشخصي
  responses: {
    [HttpStatusCodes.OK]: jsonContent(StudentDetailsSchema, "Student details"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Student not found"),
      "Student not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
  },
});

// Course Routes
export const getRegisteredCourses = createRoute({
  path: "/me/courses",
  method: "get",
  tags,
  middleware: studentMiddleware,
  request: {
    query: z.object({
      semester: z.enum(SEMESTERS),
      academicYearId: z.coerce.number(),
    }),
  },
  summary: "List Courses", // ملخص: قائمة المقررات
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(CourseSchema),
      "A list of all applicant's registered courses"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
  },
});

export const getRegisteredAcademicYears = createRoute({
  path: "/me/courses/registered-academic-years",
  method: "get",
  middleware: studentMiddleware,
  tags,
  summary: "List Years", // ملخص: قائمة السنوات
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(AcademicYearSchema),
      "An array of registered academic years"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
  },
});

// Application Routes
export const getApplication = createRoute({
  path: "/me/applications",
  method: "get",
  middleware: studentMiddleware,
  tags,
  summary: "View Application", // ملخص: عرض الطلب
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ application: ApplicationDetailsSchema }),
      "The application details"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Application not found"),
  },
});

export const createApplication = createRoute({
  path: "/me/applications",
  method: "post",
  middleware: studentMiddleware,
  tags,
  summary: "Create Application", // ملخص: إنشاء طلب
  request: {
    body: jsonContentRequired(CreateApplicationSchema, "Application data"),
  },
  responses: {
    // TODO: Make this return 201
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ success: z.boolean(), applicationId: z.number() }),
      "Application completed"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateApplicationSchema),
      "The validation error(s)"
    ),
  },
});

export const updateApplication = createRoute({
  path: "/me/applications",
  method: "patch",
  middleware: studentMiddleware,
  tags,
  summary: "Update Application", // ملخص: تحديث الطلب
  request: {
    body: jsonContentRequired(UpdateApplicationSchema, "Application data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ success: z.boolean(), applicationId: z.number() }),
      "Application Updated"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(UpdateApplicationSchema),
      "The validation error(s)"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      createMessageObjectSchema("Application already accepted"),
      "Application already accepted"
    ),
  },
});

export const saveApplicationAttachments = createRoute({
  path: "/me/applications/{applicationId}/attachments",
  method: "post",
  middleware: studentMiddleware,
  tags,
  summary: "Save Attachments", // ملخص: حفظ المرفقات
  request: {
    params: z.object({
      applicationId: z.string().transform(Number),
    }),
    body: jsonContentRequired(SaveAttachmentsSchema, "Attachment links with types"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ success: z.boolean(), applicationId: z.number() }),
      "Attachments saved"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      createMessageObjectSchema("Cannot save this attachment"),
      "Cannot save this attachment"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(SaveAttachmentsSchema),
      "The validation error(s)"
    ),
  },
});

export const deleteApplicationAttachment = createRoute({
  path: "/me/applications/{applicationId}/attachments/{attachmentId}",
  method: "delete",
  middleware: studentMiddleware,
  tags,
  summary: "Delete Attachment", // ملخص: حذف المرفق
  request: {
    params: z.object({
      applicationId: z.string().transform(Number),
      attachmentId: z.string().transform(Number),
    }),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Attachment deleted successfully",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Attachment not found"),
      "Attachment not found"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      createMessageObjectSchema("Cannot delete this attachment"),
      "Cannot delete this attachment"
    ),
  },
});

// Thesis Routes
export const checkThesisAvailability = createRoute({
  path: "/me/thesis/status",
  method: "get",
  middleware: studentMiddleware,
  tags,
  summary: "Check Thesis Status", // ملخص: تحقق من حالة الرسالة
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ available: z.literal(true) }),
      "The thesis is available to upload"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      z.object({ available: z.literal(false), reason: z.string() }),
      "The application did not meet the requirements to upload thesis"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
  },
});

export const getThesis = createRoute({
  path: "/me/thesis",
  method: "get",
  middleware: studentMiddleware,
  tags,
  summary: "View Thesis", // ملخص: عرض الرسالة
  responses: {
    [HttpStatusCodes.OK]: jsonContent(GetThesisSchema, "Student's thesis information"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Thesis not found"),
      "Thesis not found"
    ),
  },
});

export const submitThesis = createRoute({
  path: "/me/thesis",
  method: "post",
  middleware: studentMiddleware,
  tags,
  summary: "Submit Thesis", // ملخص: تسليم الرسالة
  request: {
    body: jsonContent(
      z.object({
        title: z.string().min(1),
        attachmentUrl: z.string().url(),
      }),
      "Submit thesis schema"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(GetThesisSchema, "Student's thesis information"),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      z.object({ message: z.string() }),
      "The application did not meet the requirements to upload thesis"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
  },
});

// Admin Routes
export const getStudentDetailsById = createRoute({
  path: "/{id}",
  method: "get",
  middleware: adminMiddleware,
  request: {
    params: IdParamsSchema,
  },
  tags,
  summary: "Get Student", // ملخص: جلب الطالب
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      StudentDetailsSchema.extend({ createdAt: z.string() }),
      "Student details"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Student not found"),
      "Student not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
  },
});

export const editStudentInfo = createRoute({
  path: "/{id}",
  method: "patch",
  middleware: adminMiddleware,
  tags,
  summary: "Edit Student", // ملخص: تعديل الطالب
  request: {
    body: jsonContentRequired(
      StudentDetailsSchema.partial().omit({ studentId: true }),
      "Updated student information"
    ),
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Student info updated successfully"),
      "Success response"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Student not found"),
      "Student not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StudentDetailsSchema.partial().omit({ studentId: true })),
      "Validation error"
    ),
  },
});

// Export types for handlers
export type GetStudentDetailsRoute = typeof getStudentDetails;
export type GetRegisteredCourses = typeof getRegisteredCourses;
export type GetRegisteredAcademicYearsRoute = typeof getRegisteredAcademicYears;
export type CreateApplicationRoute = typeof createApplication;
export type SaveApplicationAttachmentsRoute = typeof saveApplicationAttachments;
export type DeleteApplicationAttachmentRoute = typeof deleteApplicationAttachment;
export type GetApplicationRoute = typeof getApplication;
export type UpdateApplicationRoute = typeof updateApplication;
export type CheckThesisAvailabilityRoute = typeof checkThesisAvailability;
export type GetThesisRoute = typeof getThesis;
export type SubmitThesisRoute = typeof submitThesis;
export type GetStudentDetailsById = typeof getStudentDetailsById;
export type EditStudentInfoRoute = typeof editStudentInfo;
