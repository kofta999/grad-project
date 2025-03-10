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

  app.use(cors({ origin: "http://localhost:3002", credentials: true }));

  app.use(
    sessionMiddleware({
      store,
      expireAfterSeconds: 3600,
      cookieOptions: {
        httpOnly: true,
        path: "/",
        secure: env.NODE_ENV !== "development", // Ensure Secure is set in production
      },
      sessionCookieName: "sessionId",
    })
  );
  app.use(serveEmojiFavicon("🔥"));
  app.use(logger());
  app.use("/uploads/*", serveStatic({ root: "./" }));

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
