import { createMiddleware } from "hono/factory";
import { AppBindings } from "@/lib/types";
import { StorageService } from "@/services/storage.service";

export const uploadFile = createMiddleware<AppBindings>(async (c, next) => {
  const image = await c.req.parseBody();
  const file = image.file as File;

  const storageService = new StorageService();
  const fileUrl = await storageService.saveFile(file);

  c.set("file", fileUrl);

  await next();
});
