// src/views/mmpi2/Mmpi2Results.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { scaleHierarchy } from "@/logic/mmpi2/scale-hierarchy"
import { getResults, saveResult } from "@/lib/storage"
import { Answer } from "@/logic/types"
import { scaleLabels } from "@/logic/mmpi2/scaleLabels"

const TOTAL = 567

export default function Mmpi2Results() {
  const { testId = "mmpi2" } = useParams()
  const [q] = useSearchParams()
  const fromStorage = Boolean(q.get("id"))
  const nav = useNavigate()

  const [gender, setGender] = useState<"M" | "K" | "">("")
  const [answers, setAnswers] = useState<Answer[]>([])
  const [scores, setScores] = useState<Record<string, any>>({})
  const [mode, setMode] = useState<"raw" | "t" | "k">("t")

  useEffect(() => {
    async function load() {
      const results = await getResults()
      const filtered = results.filter((r) => r.testId === testId)
      const last = filtered.length > 0 ? filtered[filtered.length - 1] : null
      if (!last) return
      setGender(last.gender)
      setAnswers(last.answers)

      const missing = TOTAL - last.answers.filter(Boolean).length
      const patchedScores = {
        ...last.scores,
        "?": { raw: missing, t: missing, k: missing }
      }
      setScores(patchedScores)
    }
    load()
  }, [testId])

  if (!Object.keys(scores).length) {
    return (
      <p className="p-4 text-center">
        Brak wyników do wyświetlenia dla testu: {testId}
      </p>
    )
  }

  const Tab = ({ id, label }: { id: "raw" | "t" | "k"; label: string }) => (
    <button
      onClick={() => setMode(id)}
      className={`rounded-md px-3 py-1 text-sm transition-colors ${
        mode === id
          ? "bg-primary/10 text-primary"
          : "bg-muted text-foreground dark:text-muted-foreground"
      }`}
    >
      {label}
    </button>
  )

  const getScore = (key: string): number | string => {
    let rec = scores[key]
    if (!rec && key === "Mf") {
      const alt = gender === "M" ? "Mf-m" : "Mf-f"
      rec = scores[alt]
    }
    if (!rec) return "—"
    if (mode === "t" && rec.t !== undefined) return rec.t
    if (mode === "k" && rec.k !== undefined) return rec.k
    return rec.raw
  }

  const renderGroup = (title: string, keys: string[]) => {
    const columns = 4
    const rows = Math.ceil(keys.length / columns)
    const verticalOrdered: string[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const index = c * rows + r
        if (index < keys.length) verticalOrdered.push(keys[index])
      }
    }

    return (
      <div key={title} className="flex flex-col gap-1">
        <h3 className="mt-4 text-sm font-medium">{title}</h3>
        <div className="grid grid-cols-4 gap-x-3 text-sm">
          {verticalOrdered.map((k) => (
            <span key={k} title={scaleLabels[k]?.pl ?? k}>
              {k}: <b>{getScore(k)}</b>
            </span>
          ))}
        </div>
      </div>
    )
  }

  const canSave = !fromStorage && Boolean(gender) && Object.keys(scores).length

  const handleSave = () => {
    if (!canSave || !gender) return
    saveResult({ testId, gender, answers, scores })
    nav("/results")
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Wartości:</span>
        <Tab id="t" label="Tenowe" />
        <Tab id="k" label="K-skoryg." />
        <Tab id="raw" label="Surowe" />
      </div>

      {Object.entries(scaleHierarchy).map(([grp, keys]) =>
        renderGroup(grp, keys as string[])
      )}

      {!fromStorage && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="px-6"
            variant={canSave ? "default" : "secondary"}
          >
            Zapisz wyniki
          </Button>
        </div>
      )}
    </section>
  )
}
