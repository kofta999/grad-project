import { createRouter } from '@/lib/create-app'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

const router = createRouter()
  .openapi(createRoute({
    method: 'get',
    tags: ['Index'],
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema('Tasks API'), 'My API Index'),
    },
  }), c => c.json({ message: "Hi" }))

export default router
