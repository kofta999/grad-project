import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import { APPLICATION_STATUSES, DEPARTMENT_TYPES, GRADES, ROLES, SEMESTERS } from "./constants";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    user: {
      userId: number;
      role: (typeof ROLES)[number];
    };
    file?: string;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export type DepartmentType = (typeof DEPARTMENT_TYPES)[number];

export type Semester = (typeof SEMESTERS)[number];

export type GradeType = (typeof GRADES)[number];

export type ApplicationStatusType = (typeof APPLICATION_STATUSES)[number];
