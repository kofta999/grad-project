import { unauthorizedSchema } from '@/lib/constants'
import { createRouter } from '@/lib/create-app'
import { isAuthenticated } from '@/middlewares/isAuthenticated'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

const router = createRouter()
  .openapi(createRoute({
    method: 'get',
    tags: ['Index'],
    middleware: [isAuthenticated] as const,
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema('MIS API'), 'My API Index'),
      [HttpStatusCodes.UNAUTHORIZED]: jsonContent(unauthorizedSchema, "The authentication errors")
    },
  }), c => c.json({ message: "Hi" }))

export default router
