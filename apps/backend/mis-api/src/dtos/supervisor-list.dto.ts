import { z } from "@hono/zod-openapi";

export const SupervisorListSchema = z.array(
  z.object({
    supervisorId: z.number(),
    name: z.string(),
  })
);

export type SupervisorListDTO = z.infer<typeof SupervisorListSchema>;
