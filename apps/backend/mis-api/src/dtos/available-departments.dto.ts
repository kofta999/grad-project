import { z } from "@hono/zod-openapi";

export const AvailableDepartmentsSchema = z.array(
  z.object({ departmentId: z.number(), title: z.string() })
);

export type AvailableDepartmentsDTO = z.infer<typeof AvailableDepartmentsSchema>;
