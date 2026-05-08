import { test } from '@japa/runner'

test.group('Home page', () => {
  test('GET / returns 200 with Inertia page public/home', async ({ client }) => {
    const response = await client.get('/')
    response.assertStatus(200)
    response.assertTextIncludes('public/home')
  })
})
