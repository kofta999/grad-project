import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { NotFoundSchema, adminMiddleware } from "@/lib/constants";
import { CreateSupervisorSchema } from "@/dtos/create-supervisor.dto";
import { SupervisorListSchema } from "@/dtos/supervisor-list.dto";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { SupervisorDetailsSchema } from "@/dtos/supervisor-details.dto";

const tags = ["Supervisors"];

export const createSupervisor = createRoute({
  path: "/",
  method: "post",
  summary: "Create Supervisor",
  security: [
    {
      Bearer: [],
    },
  ],
  middleware: adminMiddleware,
  tags,
  request: {
    body: jsonContentRequired(CreateSupervisorSchema, "Supervisor data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(SupervisorDetailsSchema, "Supervisor created successfully"),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      createMessageObjectSchema("Failed to create supervisor"),
      "Failed to create supervisor"
    ),
  },
});

export const getSupervisorList = createRoute({
  path: "/",
  method: "get",
  summary: "Get Supervisor List",
  security: [
    {
      Bearer: [],
    },
  ],
  middleware: isAuthenticated,
  request: {
    query: z.object({
      type: z.string().optional(),
    }),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(SupervisorListSchema, "Supervisor list"),
  },
});

export const getSupervisor = createRoute({
  path: "/:id",
  method: "get",
  summary: "Get Supervisor",
  security: [
    {
      Bearer: [],
    },
  ],
  middleware: isAuthenticated,
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(SupervisorDetailsSchema, "Supervisor list"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Supervisor not found"),
  },
});

export type GetSupervisorListRoute = typeof getSupervisorList;
export type GetSupervisorRoute = typeof getSupervisor;
export type CreateSupervisorRoute = typeof createSupervisor;
