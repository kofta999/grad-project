import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import type { Session } from "hono-sessions";
import { DEPARTMENT_TYPES, GRADES, ROLES, SEMESTERS } from "./constants";

interface SessionData {
  id: number;
  role: (typeof ROLES)[number];
}

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    session: Session<SessionData>;
    file?: string;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export type DepartmentType = (typeof DEPARTMENT_TYPES)[number];

export type Semester = (typeof SEMESTERS)[number];

export type GradeType = (typeof GRADES)[number];
