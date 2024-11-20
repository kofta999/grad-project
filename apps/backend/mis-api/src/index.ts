import { serve } from "@hono/node-server";
import { log } from "@repo/logger";
import { Hono } from "hono";

export const app = new Hono()
  .get("/", (c) => {
    log("test");
    return c.text("Hello Hono!");
  });

const port = 5000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
