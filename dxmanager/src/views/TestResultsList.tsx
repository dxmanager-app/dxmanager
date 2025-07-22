// src/views/TestResultsList.tsx
import { Link, useNavigate } from "react-router-dom"
import { getResults, deleteResult } from "@/lib/storage"
import { Button } from "@/components/ui/button"

export default function TestResultsList() {
  const navigate = useNavigate()
  const results = getResults().reverse() // najnowsze na górze

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Brak zapisanych wyników
      </div>
    )
  }

  return (
    <section className="p-4 space-y-3">
      {results.map((r) => (
        <div
          key={r.id}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {r.testId.toUpperCase()} • {r.gender}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(r.date).toLocaleString()}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              asChild
              variant="outline"
              onClick={() => navigate(`/tests/${r.testId}/results?id=${r.id}`)}
            >
              <Link to={`/tests/${r.testId}/results?id=${r.id}`}>Pokaż</Link>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                deleteResult(r.id)
                window.location.reload()
              }}
            >
              Usuń
            </Button>
          </div>
        </div>
      ))}
    </section>
  )
}
