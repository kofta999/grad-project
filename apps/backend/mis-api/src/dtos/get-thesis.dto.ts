import { z } from "@hono/zod-openapi";

export const GetThesisSchema = z.object({
  thesisId: z.number(),
  applicationId: z.number(),
  title: z.string(),
  attachmentUrl: z.string(),
  createdAt: z.string(),
  supervisor: z.object({
    name: z.string(),
    email: z.string(),
  }),
});

export type GetThesisDTO = z.infer<typeof GetThesisSchema>;
