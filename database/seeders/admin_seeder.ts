import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class AdminSeeder extends BaseSeeder {
  async run() {
    const email = process.env.ADMIN_EMAIL ?? 'admin@carto-profil.local'
    const password = process.env.ADMIN_PASSWORD ?? 'Admin1234!'

    await User.updateOrCreate(
      { email },
      {
        email,
        password,
        fullName: 'Super Admin',
        role: 'super_admin',
      }
    )

    console.log(`Admin seeded: ${email}`)
  }
}