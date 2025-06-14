import { handle } from "@hono/node-server/vercel";
// @ts-ignore
import app from "../dist/src/app.js";

export const config = {
  runtime: "nodejs", // NOT 'edge'
};

export default handle(app);
