import { serveStatic } from "@hono/node-server/serve-static";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import env from "@/env";
import { logger } from "@/middlewares/logger";
import type { AppBindings } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default async function createApp() {
  const app = createRouter();

  app.use(
    cors({
      origin: env.CLIENT_URL,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "authorization", "content-type"],
      credentials: true,
      exposeHeaders: ["Content-Length", "authorization", "Authorization", "content-type"],
    })
  );

  app.use(serveEmojiFavicon("🔥"));
  app.use(logger());
  app.notFound(notFound);
  app.use(
    "/uploads/*",
    serveStatic({
      root: "./",
    })
  );

  app.onError(onError);
  return app;
}
