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

export const register: AppRouteHandler<RegisterStage1Route> = async (c) => {
  let { confirmPassword, ...studentData } = c.req.valid("json");

  if (studentData.hashedPassword !== confirmPassword) {
    throw new Error("TODO: FIXME");
  }

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
  const { email, password, role } = c.req.valid("json");
  let user;
  let userId;

  if (role === "student") {
    user = await db.query.students.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email);
      },
      columns: {
        studentId: true,
        hashedPassword: true,
      },
    });

    userId = user?.studentId;
  } else if (role === "admin") {
    user = await db.query.admins.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email);
      },
      columns: {
        adminId: true,
        hashedPassword: true,
      },
    });

    userId = user?.adminId;
  }

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  c.var.session.set("id", userId!);
  c.var.session.set("role", role);

  return c.json({}, HttpStatusCodes.OK);
};

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  c.var.session.deleteSession();

  return c.json({}, HttpStatusCodes.OK);
};

export const upload: AppRouteHandler<UploadRoute> = async (c) => {
  const file = c.var.file;

  return c.json({ uploadUrl: file! }, HttpStatusCodes.OK);
};
