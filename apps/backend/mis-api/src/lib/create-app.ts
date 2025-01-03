import type { AppBindings } from './types'
import { logger } from '@/middlewares/logger'
import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'
import { MemoryStore, sessionMiddleware } from 'hono-sessions'
import env from '@/env'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook })
}

export default function createApp() {
  const app = createRouter()
  // TODO: Decide on using / not using a memory store
  const store = new MemoryStore()

  app.use(sessionMiddleware({
    // TODO: Update session expiry time
    store, expireAfterSeconds: 3600, cookieOptions: {
      httpOnly: true,
      sameSite: "Lax",
      path: "/",
      secure: env.NODE_ENV == "production"
    },
    sessionCookieName: "sessionId"
  }))
  app.use(serveEmojiFavicon('🔥'))
  app.use(logger())

  app.notFound(notFound)
  app.onError(onError)
  return app
}
