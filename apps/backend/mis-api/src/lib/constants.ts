import env from "@/env";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const NotFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);
export const UnauthorizedSchema = createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED);
export const APP_URL = `http://localhost:${env.PORT}`;
export const ROLES = ["student", "admin"] as const;
export const DEPARTMENT_TYPES = ["diploma", "master", "phd"] as const;
export const SEMESTERS = ["first", "second", "third"] as const;
export const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"] as const;

export const studentMiddleware = [isAuthenticated, requireRole("student")];
export const adminMiddleware = [isAuthenticated, requireRole("admin")];
