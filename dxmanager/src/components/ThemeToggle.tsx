import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="ml-4 px-3 py-1 rounded border border-gray-400 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {isDark ? '☀️ Jasny' : '🌙 Ciemny'}
    </button>
  )
}
