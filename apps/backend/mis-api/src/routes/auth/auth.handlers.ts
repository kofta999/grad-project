import { AppRouteHandler } from "@/lib/types";
import { LoginRoute, LogoutRoute } from "./auth.routes";
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import db from "@/db";
import { students } from "@/db/schema";
import { sql } from "drizzle-orm";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { email, password } = c.req.valid('json')

  const user = await db.query.students.findFirst({
    where(fields, operators) {
      return operators.eq(fields.email, email)
    },
    columns: {
      studentId: true,
      hashedPassword: true
    }
  })


  // TODO: Password salting / hashing

  if (!user) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED)
  }

  c.var.session.set('id', user.studentId)

  return c.json({}, HttpStatusCodes.OK)
}

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  c.var.session.deleteSession()

  return c.json({}, HttpStatusCodes.OK)
}
