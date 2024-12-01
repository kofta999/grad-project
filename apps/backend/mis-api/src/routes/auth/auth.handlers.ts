import { AppRouteHandler } from "@/lib/types";
import { LoginRoute } from "./auth.routes";
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import db from "@/db";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { username, password } = c.req.valid('json')
  // TODO: Password salting / hashing

  const user = await db.query.users.findFirst({
    where(fields, operators) {
      return operators.eq(fields.username, username) && operators.eq(fields.password, password)
    }
  })

  if (!user) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED)
  }

  c.var.session.set('id', user.id)

  return c.json({}, HttpStatusCodes.OK)
}
