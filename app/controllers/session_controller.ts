import User from '#models/user'
import { errors as authErrors } from '@adonisjs/auth'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('admin.dashboard')
    } catch (error) {
      // On ne rattrape QUE les identifiants incorrects — toute autre erreur
      // (DB, session, réseau) remonte en 500 et apparaît dans les logs Railway
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        session.flash('errors', { credentials: 'Identifiants incorrects' })
        return response.redirect().toRoute('session.create')
      }
      throw error
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('session.create')
  }
}
