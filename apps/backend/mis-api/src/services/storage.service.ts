import { File } from "@web-std/file";
import { createWriteStream } from "fs";
import { mkdir, unlink } from "fs/promises";
import { join } from "path";
import { APP_URL } from "@/lib/constants";
import env from "@/env";
import { put, del } from "@vercel/blob";

export interface IStorageService {
  saveFile(file: File): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}

class DiskStorageService implements IStorageService {
  private readonly uploadsDir = "./uploads";

  async saveFile(file: File): Promise<string> {
    const filename = `${Date.now()}-${file.name}`;

    await mkdir(this.uploadsDir, { recursive: true });

    await this.writeFile(this.uploadsDir, new File([file], filename));

    return APP_URL + "/" + join(this.uploadsDir, filename);
  }

  async deleteFile(filePath: string): Promise<void> {
    // Extract the file path from the full URL if needed
    const relativePath = filePath.replace(APP_URL + "/", "");
    await unlink(relativePath);
  }

  private async writeFile(dest: string, file: File): Promise<void> {
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
  }
}

class VercelBlobStorageService implements IStorageService {
  async saveFile(file: File): Promise<string> {
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return blob.url;
  }

  async deleteFile(filePath: string): Promise<void> {
    del(filePath);
  }
}

export const StorageService =
  env.NODE_ENV === "development" ? DiskStorageService : VercelBlobStorageService;
