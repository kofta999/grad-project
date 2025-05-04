import { z } from "@hono/zod-openapi";

export const GetReportsSchema = z.array(
  z.object({
    reportId: z.number(),
    type: z.string(),
    title: z.string(),
    attachmentUrl: z.string(),
  })
);

export type GetReportsDTO = z.infer<typeof GetReportsSchema>;
