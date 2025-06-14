import { handle } from "@hono/node-server/vercel";
// @ts-ignore
import app from "../dist/src/app.js";

export default handle(app);
