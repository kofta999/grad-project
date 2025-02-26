import { _app } from "./app";
import { hc, InferRequestType, InferResponseType } from "hono/client";

// this is a trick to calculate the type when compiling
const _client = hc<typeof _app>("");
export type Client = typeof _client;

export function hcWithType(...args: Parameters<typeof hc>): Client {
  return hc<typeof _app>(...args);
}

export type { InferRequestType, InferResponseType };
