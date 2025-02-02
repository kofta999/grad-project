import { loginSchema, registerSchema } from "@/db/validators";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";
import { unauthorizedSchema } from "@/lib/constants";
import { isAuthenticated } from "@/middlewares/isAuthenticated";

const tags = ["Authentication"];

export const registerStage1 = createRoute({
  path: "/register1",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(registerSchema, "Register stage 1 data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ studentId: z.number() }),
      "Register stage 1 completed",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(registerSchema),
      "The validation error(s)",
    ),
  },
});

export const login = createRoute({
  path: "/login",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(loginSchema, "The login credentials"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({}), "Successful login"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(loginSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "The authentication errors",
    ),
  },
});

export const logout = createRoute({
  path: "/logout",
  method: "post",
  tags,
  middleware: [isAuthenticated] as const,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({}), "Successful logout"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "The authentication errors",
    ),
  },
});

export type RegisterStage1Route = typeof registerStage1;

export type LoginRoute = typeof login;

export type LogoutRoute = typeof logout;
