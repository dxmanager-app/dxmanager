// app/dxmanager/src/components/ui/FloatingWindow.tsx
import { useEffect } from "react"
import { Rnd } from "react-rnd"
import { X } from "lucide-react"

interface FloatingWindowProps {
  id: string
  title: React.ReactNode
  children: React.ReactNode
  onClose: (id: string) => void
  defaultX?: number
  defaultY?: number
}

export function FloatingWindow({
  id,
  title,
  children,
  onClose,
  defaultX = 100,
  defaultY = 100,
}: FloatingWindowProps) {
  // 🔹 Zamknięcie Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(id)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [id, onClose])

  return (
    <Rnd
      default={{
        x: defaultX,
        y: defaultY,
        width: 500,
        height: 400,
      }}
      minWidth={300}
      minHeight={200}
      bounds="window"
      className="z-50"
    >
      <div className="flex flex-col bg-background text-foreground border border-border shadow-xl rounded-lg h-full">
        <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border cursor-move">
          <span className="font-semibold">{title}</span>
          <button
            className="p-1 rounded hover:bg-accent"
            onClick={() => onClose(id)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </Rnd>
  )
}
