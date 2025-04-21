import { loginSchema, registerSchema } from "@/db/validators";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";
import { ROLES, unauthorizedSchema } from "@/lib/constants";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { uploadFile } from "@/middlewares/uploadFile";

const FileRequestSchema = z.object({
  file: z
    .custom<File>((v) => v instanceof File)
    .openapi({
      type: "string",
      format: "binary",
    }),
});

const tags = ["Authentication"];

export const register = createRoute({
  path: "/register",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(registerSchema, "Register stage 1 data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ studentId: z.number() }),
      "Register stage 1 completed"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(registerSchema),
      "The validation error(s)"
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
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ name: z.string(), role: z.enum(ROLES) }),
      "Successful login"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(loginSchema),
      "The validation error(s)"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(unauthorizedSchema, "The authentication errors"),
  },
});

export const logout = createRoute({
  path: "/logout",
  method: "post",
  tags,
  middleware: [isAuthenticated] as const,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({}), "Successful logout"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(unauthorizedSchema, "The authentication errors"),
  },
});

export const upload = createRoute({
  path: "/upload",
  method: "post",
  tags,
  middleware: [uploadFile] as const,
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: FileRequestSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ uploadUrl: z.string() }),
      "File uploaded successfully"
    ),
  },
});

export type RegisterStage1Route = typeof register;

export type LoginRoute = typeof login;

export type LogoutRoute = typeof logout;

export type UploadRoute = typeof upload;
