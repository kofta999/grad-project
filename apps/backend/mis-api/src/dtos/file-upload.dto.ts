import { z } from "@hono/zod-openapi";

export const FileUploadSchema = z.object({
  file: z
    .custom<File>((v) => v instanceof File)
    .openapi({
      type: "string",
      format: "binary",
    }),
});
