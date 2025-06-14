import { AppRouteHandler } from "@/lib/types";
import {
  LoginUserRoute,
  LogoutUserRoute,
  RegisterStudentRoute,
  UploadFileRoute,
} from "./auth.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { deleteCookie, setCookie } from "hono/cookie";
import { AuthService } from "@/services/auth.service";

const authService = new AuthService();

export const register: AppRouteHandler<RegisterStudentRoute> = async (c) => {
  let studentData = c.req.valid("json");

  const studentId = await authService.register(studentData);

  return c.json({ success: true, studentId }, HttpStatusCodes.OK);
};

export const login: AppRouteHandler<LoginUserRoute> = async (c) => {
  const userCredentials = c.req.valid("json");

  const maybeUser = await authService.login(userCredentials);

  if (!maybeUser) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }

  c.var.session.set("id", maybeUser.userId);
  c.var.session.set("role", maybeUser.role);
  setCookie(c, "userRole", maybeUser.role);

  return c.json({ name: maybeUser.nameAr, role: maybeUser.role }, HttpStatusCodes.OK);
};

export const logout: AppRouteHandler<LogoutUserRoute> = async (c) => {
  c.var.session.deleteSession();
  deleteCookie(c, "sessionId");
  deleteCookie(c, "userRole");
  return c.json({}, HttpStatusCodes.OK);
};

export const upload: AppRouteHandler<UploadFileRoute> = async (c) => {
  const file = c.var.file;

  return c.json({ uploadUrl: file! }, HttpStatusCodes.OK);
};
