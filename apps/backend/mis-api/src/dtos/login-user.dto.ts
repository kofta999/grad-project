import { ROLES } from "@/lib/constants";
import { z } from "@hono/zod-openapi";

export const LoginUserSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be 6 characters or more"),
  role: z.enum(ROLES),
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
