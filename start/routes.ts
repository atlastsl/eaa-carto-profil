import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('public/home', {}).as('home')

// Routes auth du starter kit (à sécuriser en Story 3 - Epic 3)
const SessionController = () => import('#controllers/session_controller')
const NewAccountController = () => import('#controllers/new_account_controller')

router
  .get('/login', [SessionController, 'create'])
  .as('session.create')

router
  .post('/login', [SessionController, 'store'])
  .as('session.store')

router
  .delete('/logout', [SessionController, 'destroy'])
  .as('session.destroy')

router
  .get('/register', [NewAccountController, 'create'])
  .as('new_account.create')

router
  .post('/register', [NewAccountController, 'store'])
  .as('new_account.store')
