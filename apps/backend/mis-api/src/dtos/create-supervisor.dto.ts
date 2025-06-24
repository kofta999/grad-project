import { z } from "@hono/zod-openapi";

export const CreateSupervisorSchema = z.object({
  fullNameAr: z.string(),
  fullNameEn: z.string(),
  email: z.string(),
  imageUrl: z.string().optional().nullable(),
  isOutsider: z.boolean(),
});

export type CreateSupervisorDTO = z.infer<typeof CreateSupervisorSchema>;
