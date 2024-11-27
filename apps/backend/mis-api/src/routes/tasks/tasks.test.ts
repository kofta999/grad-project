import type { AppOpenAPI } from '@/lib/types'
import createApp from '@/lib/create-app'
import { testClient } from 'hono/testing'
import { describe, expect, expectTypeOf, it } from 'vitest'
import router from './tasks.index'

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp()
  testApp.route('/', router)
  return testApp
}

describe('tasks list', () => {
  it('responds with an array again', async () => {
    const client = testClient(createApp().route('/', router))
    const response = await client.tasks.$get()
    const json = await response.json()

    expectTypeOf(json).toBeArray()
  })

  it('validates the id param', async () => {
    const client = testClient(createApp().route('/', router))
    const response = await client.tasks[':id'].$get({
      param: {
        id: 'test',
      },
    })

    expect(response.status).toBe(422)
  })
})
