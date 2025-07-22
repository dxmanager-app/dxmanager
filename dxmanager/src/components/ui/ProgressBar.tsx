// src/components/ui/ProgressBar.tsx
interface Props {
  total: number
  answered: number
  className?: string
}

/**
 * Sticky pasek postępu.
 * ● Tor (pusta część): bg-border/40 -- wyraźny w jasnym motywie,
 *   w dark-mode przyciemniony automatycznie.
 * ● Wskaźnik: bg-primary
 * ● pointer-events-none  →  nie blokuje kliknięć.
 */
export default function ProgressBar({ total, answered, className = "" }: Props) {
  const value = Math.round((answered / total) * 100)

  return (
    <div
      className={`sticky bottom-0 left-0 right-0 z-10 pointer-events-none
                  bg-background/90 backdrop-blur-md border-t border-border
                  px-4 py-2 ${className}`}
    >
      <div className="h-3 w-full rounded-full bg-border/40">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        {answered}/{total} ({value}%)
      </p>
    </div>
  )
}
