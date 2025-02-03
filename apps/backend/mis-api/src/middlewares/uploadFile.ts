import { File } from "@web-std/file";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { join } from "path";
import { createMiddleware } from "hono/factory";
import { AppBindings } from "@/lib/types";
import { HonoStorageFile } from "@hono-storage/core";
import { APP_URL } from "@/lib/constants";

export const uploadFile = createMiddleware<AppBindings>(async (c, next) => {
  const image = await c.req.parseBody();
  const file = new HonoStorageFile(image.file as File, {
    name: (image.file as File).name,
    type: "single",
  });

  const finalDest = "./uploads";
  const filename = `${Date.now()}-${file.name}`;

  await mkdir(finalDest, { recursive: true });

  await saveFile(finalDest, new File([file], filename));

  c.set("file", APP_URL + "/" + join(finalDest, filename));

  await next();
});

const saveFile = async (dest: string, file: File) => {
  const writeStream = createWriteStream(join(dest, file.name));
  const reader = file.stream().getReader();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    writeStream.write(value);
  }
  writeStream.end();
};
