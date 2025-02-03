import {
  attachmentsSchema,
  loginSchema,
  registerStep1Schema,
  registerStep2Schema,
} from "@/db/validators";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";
import { unauthorizedSchema } from "@/lib/constants";
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

export const registerStage1 = createRoute({
  path: "/register1",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(registerStep1Schema, "Register stage 1 data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ studentId: z.number() }),
      "Register stage 1 completed",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(registerStep1Schema),
      "The validation error(s)",
    ),
  },
});

export const registerStage2 = createRoute({
  path: "/register2",
  method: "post",
  middleware: [isAuthenticated] as const,
  tags,
  request: {
    body: jsonContentRequired(registerStep2Schema, "Register stage 2 data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ applicationId: z.number() }),
      "Register stage 2 completed",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(registerStep2Schema),
      "The validation error(s)",
    ),
  },
});

export const saveAttachments = createRoute({
  path: "/attachments",
  method: "post",
  middleware: [isAuthenticated] as const,
  tags,
  request: {
    body: jsonContentRequired(attachmentsSchema, "Attachment links with types"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ applicationId: z.number() }),
      "Attachments saved",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(registerStep2Schema),
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
      "File uploaded successfully",
    ),
  },
});

export type RegisterStage1Route = typeof registerStage1;

export type RegisterStage2Route = typeof registerStage2;

export type AttachmentsRoute = typeof saveAttachments;

export type LoginRoute = typeof login;

export type LogoutRoute = typeof logout;

export type UploadRoute = typeof upload;
