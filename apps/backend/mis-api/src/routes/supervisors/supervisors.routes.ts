import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createMessageObjectSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { CreateSupervisorSchema } from "@/dtos/create-supervisor.dto";
import { SupervisorDetailsSchema } from "@/dtos/supervisor-details.dto";
import { SupervisorListSchema } from "@/dtos/supervisor-list.dto";
import { adminMiddleware, NotFoundSchema } from "@/lib/constants";
import { isAuthenticated } from "@/middlewares/isAuthenticated";

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
