import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";
import { ROLES, UnauthorizedSchema } from "@/lib/constants";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { uploadFile } from "@/middlewares/uploadFile";
import { RegisterStudentSchema } from "@/dtos/register-student.dto";
import { LoginUserSchema } from "@/dtos/login-user.dto";
import { FileUploadSchema } from "@/dtos/file-upload.dto";

const tags = ["Authentication"];

export const register = createRoute({
    path: "/register",
    method: "post",
    tags,
    summary: "Register Student", // ملخص: تسجيل الطالب
    request: {
        body: jsonContentRequired(RegisterStudentSchema, "Student registration schema"),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ studentId: z.number() }),
            "Student successfully registered"
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(RegisterStudentSchema),
            "The validation error(s)"
        ),
    },
});

export const login = createRoute({
    path: "/login",
    method: "post",
    tags,
    summary: "Login User", // ملخص: دخول المستخدم
    request: {
        body: jsonContentRequired(LoginUserSchema, "The login credentials"),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ name: z.string(), role: z.enum(ROLES) }),
            "Successful login"
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(LoginUserSchema),
            "The validation error(s)"
        ),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(UnauthorizedSchema, "The authentication errors"),
    },
});

export const logout = createRoute({
    path: "/logout",
    method: "post",
    tags,
    middleware: [isAuthenticated] as const,
    summary: "Logout User",  // الملخص: خروج المستخدم
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.object({}), "Successful logout"),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(UnauthorizedSchema, "The authentication errors"),
    },
});

export const upload = createRoute({
    path: "/upload",
    method: "post",
    tags,
    summary: "Upload File", // ملخص: رفع ملف
    middleware: [uploadFile] as const,
    request: {
        body: {
            content: {
                "multipart/form-data": {
                    schema: FileUploadSchema,
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

export type RegisterStudentRoute = typeof register;

export type LoginUserRoute = typeof login;

export type LogoutUserRoute = typeof logout;

export type UploadFileRoute = typeof upload;

