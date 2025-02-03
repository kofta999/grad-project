import { AppBindings } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMiddleware } from "hono/factory";

export const isAuthenticated = createMiddleware<AppBindings>(
  async (c, next) => {
    if (c.var.session.sessionValid() && c.var.session.get("id")) {
      await next();
    } else {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED,
      );
    }
  },
);
