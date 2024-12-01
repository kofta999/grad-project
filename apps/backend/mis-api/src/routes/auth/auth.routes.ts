import { insertUsersSchema } from "@/db/schema";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { createErrorSchema } from "stoker/openapi/schemas";
import { unauthorizedSchema } from "@/lib/constants";

const tags = ["Authentication"]

export const login = createRoute({
  path: "/login",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertUsersSchema, "The login credentials")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({}), "Successful login"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertUsersSchema), "The validation error(s)"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(unauthorizedSchema, "The authentication errors")
  }
})

export type LoginRoute = typeof login
