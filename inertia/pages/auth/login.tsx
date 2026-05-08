import { useForm } from '@inertiajs/react'

export default function Login() {
  const form = useForm({ email: '', password: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.post('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-lg border border-divider bg-surface p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-secondary">Connexion</h1>
        <p className="mb-6 text-sm text-text-muted">Accès réservé aux administrateurs EAA</p>

        {form.errors.credentials && (
          <div className="mb-4 rounded bg-error/10 px-4 py-3 text-sm text-error">
            {form.errors.credentials}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-text">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.data.email}
              onChange={(e) => form.setData('email', e.target.value)}
              className="w-full rounded border border-divider bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {form.errors.email && (
              <p className="mt-1 text-xs text-error">{form.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-text">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={form.data.password}
              onChange={(e) => form.setData('password', e.target.value)}
              className="w-full rounded border border-divider bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={form.processing}
            className="w-full rounded bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {form.processing ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
