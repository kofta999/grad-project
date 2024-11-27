import { _app } from './app'
import { hc } from 'hono/client'

// this is a trick to calculate the type when compiling
const _client = hc<typeof _app>('')
export type Client = typeof _client

export function hcWithType(...args: Parameters<typeof hc>): Client {
  return hc<typeof _app>(...args)
}
