import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { DEPARTMENT_TYPES, studentMiddleware } from "@/lib/constants";
import { AvailableDepartmentsSchema } from "@/dtos/available-departments.dto";

const tags = ["Departments"];

export const getAvailableDepartments = createRoute({
    path: "/",
    method: "get",
    request: {
        query: z.object({
            type: z.enum(DEPARTMENT_TYPES),
        }),
    },
    middleware: studentMiddleware,
    tags,
    summary: "List Departments", // ملخص: قائمة الأقسام
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            AvailableDepartmentsSchema,
            "An array of available departments for this type"
        ),
    },
});

export type GetAvailableDepartmentsRoute = typeof getAvailableDepartments;

