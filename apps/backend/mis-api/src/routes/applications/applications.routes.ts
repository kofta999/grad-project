import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContentRequired, jsonContent } from "stoker/openapi/helpers";
import {
  createMessageObjectSchema,
  createErrorSchema,
  IdParamsSchema,
} from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { APPLICATION_STATUSES, NotFoundSchema, SEMESTERS, adminMiddleware } from "@/lib/constants";
import { AdminApplicationsListSchema } from "@/dtos/admin-applications-list.dto";
import { ApplicationDetailsSchema } from "@/dtos/application-details.dto";
import { CourseSchema } from "@/dtos/registered-course.dto";

const tags = ["Applications"];

export const getAllApplications = createRoute({
  path: "/",
  method: "get",
  tags,
  middleware: adminMiddleware,
  request: {
    query: z.object({
      nameAr: z.string().optional(),
      page: z.coerce.number().min(1).default(1),
      status: z.enum(APPLICATION_STATUSES).optional(),
      sortName: z.enum(["asc", "desc"]).default("asc"),
    }),
  },
  summary: "List Applications", // ملخص: قائمة الطلبات
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      AdminApplicationsListSchema,
      "A list of all students with applications"
    ),
  },
});

export const getApplicationDetails = createRoute({
  path: "/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  middleware: adminMiddleware,
  summary: "View Application Details", // ملخص: عرض تفاصيل الطلب
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ApplicationDetailsSchema, "Application details"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Application not found"),
  },
});

export const getApplicationRegisteredCourses = createRoute({
  path: "/{id}/courses",
  method: "get",
  tags,
  middleware: [isAuthenticated, requireRole("admin")] as const,
  request: {
    params: IdParamsSchema,
    query: z.object({
      semester: z.enum(SEMESTERS),
      academicYearId: z.coerce.number(),
    }),
  },
  summary: "List Registered Courses", // ملخص: عرض المقررات المسجلة
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(CourseSchema), "A list of all applicant's courses"),
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Error getting courses",
      content: {
        "application/json": { schema: z.object({ error: z.string() }) },
      },
    },
  },
});

export const getApplicationAvailableCourses = createRoute({
  path: "/{id}/available-courses",
  method: "get",
  middleware: [isAuthenticated, requireRole("admin")],
  tags,
  summary: "List Available Courses", // ملخص: عرض المقررات المتاحة
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(CourseSchema), "Available courses"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ error: z.string() })),
      "Validation error"
    ),
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Error getting courses",
      content: {
        "application/json": { schema: z.object({ error: z.string() }) },
      },
    },
  },
});

export const acceptApplication = createRoute({
  path: "/accept",
  method: "post",
  tags,
  middleware: adminMiddleware,
  summary: "Accept Application", // ملخص: قبول الطلب
  request: {
    body: jsonContentRequired(z.object({ applicationId: z.number() }), "Application ID"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Application accepted"),
      "Application accepted"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Application already accepted"),
      "Application already accepted"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ applicationId: z.number() })),
      "The validation error(s)"
    ),
  },
});

export const rejectApplication = createRoute({
  path: "/reject",
  method: "post",
  summary: "Reject Application",
  tags,
  middleware: adminMiddleware,
  request: {
    body: jsonContentRequired(
      z.object({
        applicationId: z.number(),
      }),
      "Application rejection data"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Application rejected"),
      "Application rejected"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Application already rejected"),
      "Application already rejected"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ applicationId: z.number(), reason: z.string().optional() })),
      "The validation error(s)"
    ),
  },
});

export type GetAllApplicationsRoute = typeof getAllApplications;
export type GetApplicationDetailsRoute = typeof getApplicationDetails;
export type GetApplicationRegisteredCoursesRoute = typeof getApplicationRegisteredCourses;
export type GetApplicationAvailableCoursesRoute = typeof getApplicationAvailableCourses;
// TODO: Use PUT
export type AcceptApplicationRoute = typeof acceptApplication;
export type RejectApplicationRoute = typeof rejectApplication;
