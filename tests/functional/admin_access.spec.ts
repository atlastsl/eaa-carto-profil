import { test } from '@japa/runner'
import User from '#models/user'

test.group('Admin — protection des routes', (group) => {
  let adminUser: User

  group.each.setup(async () => {
    adminUser = await User.create({
      email: 'admin@test.local',
      password: 'Secret1234!',
      fullName: 'Admin Test',
      role: 'admin',
    })
  })

  group.each.teardown(async () => {
    await User.query().delete()
  })

  test('GET /admin sans authentification redirige vers /login', async ({ client }) => {
    const response = await client.get('/admin')
    response.assertRedirectsTo('/login')
  })

  test('GET /admin avec authentification retourne 200', async ({ client }) => {
    const response = await client.get('/admin').loginAs(adminUser)
    response.assertStatus(200)
  })

  test('GET / reste accessible sans authentification', async ({ client }) => {
    const response = await client.get('/')
    response.assertStatus(200)
  })

  test('GET /login reste accessible sans authentification', async ({ client }) => {
    const response = await client.get('/login')
    response.assertStatus(200)
  })
})
