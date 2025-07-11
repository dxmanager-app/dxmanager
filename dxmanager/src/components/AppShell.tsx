import MainMenuBar from './MainMenuBar'
import { ReactNode } from 'react'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <MainMenuBar />
      <main className="flex-1 w-full max-w-screen-xl mx-auto p-6">
        {children}
      </main>
    </div>
  )
}
