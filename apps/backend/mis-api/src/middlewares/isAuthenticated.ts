import { AppBindings } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMiddleware } from "hono/factory";
import { JwtService } from "@/services/jwt.service";
import env from "@/env";

export const isAuthenticated = createMiddleware<AppBindings>(async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }

  try {
    const jwtService = new JwtService<AppBindings["Variables"]["user"]>(env.JWT_SECRET); // Assuming JWT_SECRET is in c.env
    const payload = await jwtService.verify(token);

    // Check if the payload has the necessary 'id' property
    if (!payload || !payload.userId) {
      return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
    }

    c.set("user", payload); // Set user information in context for subsequent middlewares
    await next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }
});
