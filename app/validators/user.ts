import vine from '@vinejs/vine'

const email = () => vine.string().email().normalizeEmail().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(72)

export const loginValidator = vine.compile(
  vine.object({
    email: email(),
    password: vine.string().minLength(1),
  })
)

export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password().confirmed({
    confirmationField: 'passwordConfirmation',
  }),
})
