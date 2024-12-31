import type { AppOpenAPI } from '@/lib/types'
import createApp from '@/lib/create-app'
import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import router from './auth.index'

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp()
  testApp.route('/', router)
  return testApp
}

describe('authentication', () => {
  it('fails if validation is wrong', async () => {
    const client = testClient(createApp().route('/', router))
    const response = await client.login.$post({ json: { email: "a", password: "b" } })
    const json = await response.json()

    expect(response.status).toBe(422)
    expect(json).toHaveProperty('success')
  })
})
