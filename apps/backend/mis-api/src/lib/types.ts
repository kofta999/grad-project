import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import type { Session } from "hono-sessions";

interface SessionData {
  id: number;
}

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    session: Session<SessionData>;
    file?: string;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
