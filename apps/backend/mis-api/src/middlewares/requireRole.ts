import { AppBindings } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMiddleware } from "hono/factory";
import { ROLES } from "@/lib/constants";

export const requireRole = (role: (typeof ROLES)[number]) =>
  createMiddleware<AppBindings>(async (c, next) => {
    if (c.var.user.role === role) {
      await next();
    } else {
      return c.json({ message: HttpStatusPhrases.FORBIDDEN }, HttpStatusCodes.FORBIDDEN);
    }
  });
