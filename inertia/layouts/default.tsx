import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-divider bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <a href="/" className="text-lg font-bold text-secondary">
            Carto-Profil
          </a>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}
