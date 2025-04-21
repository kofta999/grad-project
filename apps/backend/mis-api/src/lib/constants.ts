import env from "@/env";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const NotFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);
export const UnauthorizedSchema = createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED);
export const APP_URL = `http://localhost:${env.PORT}`;
export const ROLES = ["student", "admin"] as const;
export const DEPARTMENT_TYPES = ["diploma", "master", "phd"] as const;
