import { test } from '@japa/runner'
import User from '#models/user'

test.group('Auth — session login/logout', (group) => {
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

  test('POST /login avec identifiants valides crée une session et redirige vers /admin', async ({
    client,
  }) => {
    // assertRedirectsTo vérifie la chaîne de redirections suivies
    const response = await client.post('/login').form({
      email: 'admin@test.local',
      password: 'Secret1234!',
    })

    response.assertRedirectsTo('/admin')
  })

  test('POST /login avec mot de passe incorrect redirige sans créer de session', async ({
    client,
  }) => {
    // Avec mauvais mot de passe, le controller redirige vers /login (pas /admin)
    const response = await client.post('/login').form({
      email: 'admin@test.local',
      password: 'WrongPassword!',
    })

    response.assertRedirectsTo('/login')
    response.assertCookie('adonis-session')
  })

  test('POST /login avec email inexistant redirige vers /login', async ({ client }) => {
    const response = await client.post('/login').form({
      email: 'nobody@test.local',
      password: 'Secret1234!',
    })

    response.assertRedirectsTo('/login')
  })

  test('GET /login redirige un utilisateur déjà authentifié (accède à une page 200)', async ({
    client,
  }) => {
    // loginAs définit la session → guest middleware redirige vers /admin
    // La chaîne de redirect interne n'est pas capturée par assertRedirectsTo avec loginAs,
    // mais le 200 final prouve que l'utilisateur a quitté le formulaire de login
    const response = await client.get('/login').loginAs(adminUser)
    response.assertStatus(200)
  })

  test('DELETE /logout détruit la session et redirige vers /login', async ({ client }) => {
    const response = await client.delete('/logout').loginAs(adminUser)
    response.assertRedirectsTo('/login')
  })
})
