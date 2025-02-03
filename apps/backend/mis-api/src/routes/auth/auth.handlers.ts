import { AppRouteHandler } from "@/lib/types";
import {
  LoginRoute,
  LogoutRoute,
  RegisterStage1Route,
  UploadRoute,
} from "./auth.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import db from "@/db";
import { students } from "@/db/schema";
import bcrypt from "bcryptjs";
import { HonoStorageFile } from "@hono-storage/core";

export const registerStage1: AppRouteHandler<RegisterStage1Route> = async (
  c,
) => {
  let studentData = c.req.valid("json");
  // TODO: Handle image uploads

  studentData.hashedPassword = await bcrypt.hash(
    studentData.hashedPassword,
    10,
  );

  const newStudents = await db
    .insert(students)
    .values(studentData)
    .returning({ studentId: students.studentId });

  return c.json(
    { success: true, studentId: newStudents[0].studentId },
    HttpStatusCodes.OK,
  );
};

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { email, password } = c.req.valid("json");

  const user = await db.query.students.findFirst({
    where(fields, operators) {
      return operators.eq(fields.email, email);
    },
    columns: {
      studentId: true,
      hashedPassword: true,
    },
  });

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    console.log("here");
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  c.var.session.set("id", user.studentId);

  return c.json({}, HttpStatusCodes.OK);
};

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  c.var.session.deleteSession();

  return c.json({}, HttpStatusCodes.OK);
};

export const upload: AppRouteHandler<UploadRoute> = async (c) => {
  const file = c.var.file;

  console.log(file);

  return c.json({ uploadUrl: file! }, HttpStatusCodes.OK);
};
