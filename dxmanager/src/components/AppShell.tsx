// src/components/AppShell.tsx
import { ReactNode, useEffect } from "react"
import MainSidebar from "@/components/MainSidebar"

export default function AppShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const html = document.documentElement

    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [])

  return (
    <div className="flex flex-row min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <MainSidebar />
      <main className="flex-1 w-full max-w-screen-xl mx-auto p-6">
        {children}
      </main>
    </div>
  )
}
