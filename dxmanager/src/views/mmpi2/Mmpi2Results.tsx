// app/dxmanager/src/views/mmpi2/Mmpi2Results.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { scaleHierarchy } from "@/logic/mmpi2/scale-hierarchy"
import { getResults } from "@/lib/storage"
import { Settings, Maximize2, Filter } from "lucide-react"
import { FloatingWindow } from "@/components/ui/FloatingWindow"
import { GroupDetailsTable } from "@/components/mmpi2/GroupDetailsTable"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

type WindowState = {
  id: string
  group: string
  visibleColumns: { raw: boolean; k: boolean; t: boolean }
  visibleRows: string[]
}

export default function Mmpi2Results() {
  const { testId = "mmpi2" } = useParams()
  const [q] = useSearchParams()
  const fromStorage = Boolean(q.get("id"))
  const nav = useNavigate()

  const [scores, setScores] = useState<Record<string, any>>({})
  const [isSettingsMode, setIsSettingsMode] = useState(false)
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])

  useEffect(() => {
    async function load() {
      const results = await getResults()
      const filtered = results.filter((r) => r.testId === testId)
      const last = filtered.length > 0 ? filtered[filtered.length - 1] : null
      if (!last) return
      setScores(last.scores)
    }
    load()
  }, [testId])

  const handleOpenDetails = (groupName: string) => {
    if (openWindows.some((w) => w.group === groupName)) return
    const allRows = scaleHierarchy[groupName as keyof typeof scaleHierarchy] || []
    setOpenWindows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        group: groupName,
        visibleColumns: { raw: true, k: true, t: true },
        visibleRows: allRows,
      },
    ])
  }

  const handleCloseWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const updateWindowFilter = (id: string, update: Partial<Omit<WindowState, "id" | "group">>) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...update } : w))
    )
  }

  const isVrinTrinGroup = (name: string) =>
    name.toLowerCase().includes("vrin") && name.toLowerCase().includes("trin")

  return (
    <section className="flex flex-col gap-6 p-4">
      {/* Nagłówek */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard wyników MMPI-2</h1>
        <div className="flex gap-2">
          <Button
            variant={isSettingsMode ? "default" : "secondary"}
            onClick={() => setIsSettingsMode((p) => !p)}
          >
            <Settings className="w-4 h-4 mr-2" />
            {isSettingsMode ? "Zakończ ustawienia" : "Widok"}
          </Button>
          {!fromStorage && (
            <Button variant="default" onClick={() => nav("/results")}>
              Zapisz
            </Button>
          )}
        </div>
      </div>

      {/* Kafelki */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(scaleHierarchy).map(([groupName, scales]) => (
          <Card
            key={groupName}
            className="shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-background text-foreground"
          >
            <CardHeader className="bg-muted flex justify-between items-center">
              <CardTitle className="text-base">{groupName}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                title="Otwórz szczegóły"
                onClick={() => handleOpenDetails(groupName)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-3 text-sm">
              <div className="max-h-40 overflow-y-auto pr-2">
                <ul className="space-y-1">
                  {scales.map((scaleKey) => {
                    const item = scores[scaleKey]
                    const value = isVrinTrinGroup(groupName)
                      ? item?.raw ?? "—"
                      : item?.t ?? "—"
                    return (
                      <li
                        key={scaleKey}
                        className="flex justify-between border-b border-border last:border-b-0 py-1"
                      >
                        <span className="font-medium">{scaleKey}</span>
                        <span>{value}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Okna */}
      {openWindows.map((w) => {
        const allRows = scaleHierarchy[w.group as keyof typeof scaleHierarchy] || []
        return (
          <FloatingWindow
            key={w.id}
            id={w.id}
            title={
              <div className="flex justify-between items-center w-full">
                <span>{w.group}</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Widoczne kolumny</p>
                        {["raw", "k", "t"].map((key) => (
                          <div key={key} className="flex items-center gap-2 mb-1">
                            <Checkbox
                              id={`col-${key}`}
                              checked={w.visibleColumns[key as keyof typeof w.visibleColumns]}
                              onCheckedChange={(val) =>
                                updateWindowFilter(w.id, {
                                  visibleColumns: {
                                    ...w.visibleColumns,
                                    [key]: Boolean(val),
                                  },
                                })
                              }
                            />
                            <label htmlFor={`col-${key}`} className="text-sm capitalize">
                              {key.toUpperCase()}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Widoczne wiersze</p>
                        <div className="max-h-40 overflow-auto pr-1 space-y-1">
                          {allRows.map((r) => (
                            <div key={r} className="flex items-center gap-2">
                              <Checkbox
                                id={`row-${r}`}
                                checked={w.visibleRows.includes(r)}
                                onCheckedChange={(val) =>
                                  updateWindowFilter(w.id, {
                                    visibleRows: val
                                      ? [...w.visibleRows, r]
                                      : w.visibleRows.filter((i) => i !== r),
                                  })
                                }
                              />
                              <label htmlFor={`row-${r}`} className="text-sm truncate">
                                {r}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            }
            onClose={() => handleCloseWindow(w.id)}
          >
            <GroupDetailsTable
              rows={scaleHierarchy[w.group as keyof typeof scaleHierarchy]}
              scores={scores}
              groupName={w.group}
              visibleColumns={w.visibleColumns}
              visibleRows={w.visibleRows}
            />
          </FloatingWindow>
        )
      })}
    </section>
  )
}
