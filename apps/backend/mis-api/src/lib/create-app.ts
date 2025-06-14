import type { AppBindings } from "./types";
import { logger } from "@/middlewares/logger";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { MemoryStore, sessionMiddleware } from "hono-sessions";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";
import env from "@/env";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default function createApp() {
  const app = createRouter();
  // TODO: Decide on using / not using a memory store
  const store = new MemoryStore();

  app.use(
    cors({
      origin: env.CLIENT_URL,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "authorization", "content-type"],
      credentials: true,
      exposeHeaders: ["Content-Length", "authorization", "Authorization", "content-type"],
    })
  );

  app.use(
    sessionMiddleware({
      store,
      expireAfterSeconds: 3600,
      cookieOptions: {
        httpOnly: true,
        path: "/",
        secure: env.NODE_ENV !== "development", // Ensure Secure is set in production
        sameSite: "None",
      },
      sessionCookieName: "sessionId",
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
