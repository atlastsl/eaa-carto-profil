import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { loginThrottle } from '#start/limiter'

router.on('/').renderInertia('public/home', {}).as('home')

const SessionController = () => import('#controllers/session_controller')
const NewAccountController = () => import('#controllers/new_account_controller')
const AdminController = () => import('#modules/admin/admin_controller')

// Routes login — middleware guest : redirige si déjà authentifié
router
  .group(() => {
    router.get('/login', [SessionController, 'create']).as('session.create')
    router.post('/login', [SessionController, 'store']).as('session.store').use(loginThrottle)
  })
  .use(middleware.guest())

router.delete('/logout', [SessionController, 'destroy']).as('session.destroy')

// Groupe admin protégé — toutes les routes admin futures s'ajoutent ici
// Story 3.3+ : RBAC, membres, signalements, audit...
router
  .group(() => {
    router.get('/', [AdminController, 'index']).as('admin.dashboard')
  })
  .prefix('/admin')
  .use(middleware.auth())

// Routes register (du starter kit — seront retirées ou sécurisées en Story 3.4)
router.get('/register', [NewAccountController, 'create']).as('new_account.create')
router.post('/register', [NewAccountController, 'store']).as('new_account.store')
