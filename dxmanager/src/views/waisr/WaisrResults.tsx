// app/dxmanager/src/views/waisr/WaisrResults.tsx
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  calculateWaisr,
  toBarChartData,
  SUBTESTS_SLOWNE,
  SUBTESTS_BEZSLOWNE,
} from "@/logic/waisr/calculate"
import type { RawScores, Gender, Subtest, CalculatedResult } from "@/logic/waisr/types"

/** Struktura danych zapisywana przez WaisrInput */
type StoredData = {
  age: string
  gender: string
  rawScores: Record<string, string>
}

/** Bezpieczny parser localStorage → {age, gender, raw} albo null */
function parseStored(): { age: number; gender: Gender; raw: RawScores } | null {
  const txt = localStorage.getItem("waisr-data")
  if (!txt) return null

  let parsed: StoredData
  try {
    parsed = JSON.parse(txt)
  } catch {
    return null
  }

  const age =
    parsed.age === "" || parsed.age == null ? null : Number.parseInt(parsed.age, 10)
  const gender =
    parsed.gender === "M" || parsed.gender === "K" ? (parsed.gender as Gender) : null

  const raw: RawScores = {} as RawScores
  for (const [k, v] of Object.entries(parsed.rawScores || {})) {
    const key = k as Subtest
    if (v === "" || v == null) {
      raw[key] = null
    } else {
      const n = Number.parseInt(v as string, 10)
      raw[key] = Number.isNaN(n) ? null : n
    }
  }

  if (age == null || gender == null) return null
  return { age, gender, raw }
}

/** Prosty wykres słupkowy (bez zewn. bibliotek) */
function BarChart({
  data,
  title,
}: {
  data: { label: string; wp: number | null }[]
  title?: string
}) {
  const max = useMemo(() => {
    const vals = data.map((d) => (typeof d.wp === "number" ? d.wp : 0))
    return Math.max(1, ...vals)
  }, [data])

  return (
    <Card className="p-4">
      {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
      <div className="flex items-end gap-2 h-48 w-full">
        {data.map((d) => {
          const v = typeof d.wp === "number" ? d.wp : 0
          const pct = (v / max) * 100
          return (
            <div key={d.label} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t bg-primary/80"
                style={{ height: `${pct}%` }}
                title={`${d.label}: ${d.wp ?? "—"}`}
              />
              <div className="mt-2 text-[10px] text-center leading-tight">{d.label}</div>
              <div className="text-xs text-muted-foreground">{d.wp ?? "—"}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default function WaisrResults() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CalculatedResult | null>(null)

  useEffect(() => {
    const input = parseStored()
    if (!input) {
      setError("Brak danych do przeliczenia. Wróć i wprowadź wyniki w WAIS-R.")
      return
    }
    try {
      const r = calculateWaisr({
        mode: "basic",
        age: input.age,
        gender: input.gender,
        raw: input.raw,
      })
      setResult(r)
    } catch (e) {
      console.error(e)
      setError("Wystąpił błąd podczas przeliczania wyników.")
    }
  }, [])

  if (error) {
    return (
      <section className="p-6 space-y-4">
        <p className="text-center text-red-500">{error}</p>
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Wstecz
          </Button>
        </div>
      </section>
    )
  }

  if (!result) {
    return <p className="p-6 text-center">Ładowanie…</p>
  }

  const barDataAll = toBarChartData(result)
  const barDataSlowne = barDataAll.filter((d) => SUBTESTS_SLOWNE.includes(d.label as Subtest))
  const barDataBezslowne = barDataAll.filter((d) =>
    SUBTESTS_BEZSLOWNE.includes(d.label as Subtest)
  )

  return (
    <section className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">WAIS-R(PL) — Wyniki przeliczone</h1>
          <p className="text-sm text-muted-foreground">
            Grupa wiekowa: <b>{result.ageGroup}</b> • Wiek: <b>{result.age}</b> • Płeć:{" "}
            <b>{result.gender}</b>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Wstecz
          </Button>
          <Button onClick={() => navigate("/")}>Zakończ</Button>
        </div>
      </header>

      {/* Tabele wyników */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Testy słowne</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">Podtest</th>
                <th className="py-1 text-center">WS</th>
                <th className="py-1 text-center">WP</th>
              </tr>
            </thead>
            <tbody>
              {SUBTESTS_SLOWNE.map((s) => {
                const item = result.bySubtest[s]
                return (
                  <tr key={s} className="border-b last:border-none">
                    <td className="py-1">{s}</td>
                    <td className="py-1 text-center">{item?.ws ?? "—"}</td>
                    <td className="py-1 text-center font-medium">{item?.wp ?? "—"}</td>
                  </tr>
                )
              })}
              <tr>
                <td className="py-2 font-medium">Suma WP (Skala słowna)</td>
                <td />
                <td className="py-2 text-center font-semibold">{result.sums.slowna ?? "—"}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Testy bezsłowne</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">Podtest</th>
                <th className="py-1 text-center">WS</th>
                <th className="py-1 text-center">WP</th>
              </tr>
            </thead>
            <tbody>
              {SUBTESTS_BEZSLOWNE.map((s) => {
                const item = result.bySubtest[s]
                return (
                  <tr key={s} className="border-b last:border-none">
                    <td className="py-1">{s}</td>
                    <td className="py-1 text-center">{item?.ws ?? "—"}</td>
                    <td className="py-1 text-center font-medium">{item?.wp ?? "—"}</td>
                  </tr>
                )
              })}
              <tr>
                <td className="py-2 font-medium">Suma WP (Skala bezsłowna)</td>
                <td />
                <td className="py-2 text-center font-semibold">{result.sums.bezslowna ?? "—"}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* Suma pełnoskalowa + IQ (placeholdery na razie) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Skala pełna</h2>
          <div className="text-3xl font-bold">{result.sums.pelna ?? "—"}</div>
          <div className="text-sm text-muted-foreground">Suma WP (słowne + bezsłowne)</div>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">IQ słowne</h2>
          <div className="text-3xl font-bold">{result.iq?.slowne ?? "—"}</div>
          <div className="text-sm text-muted-foreground">wg tabel IQ (do uzupełnienia)</div>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">IQ pełnoskalowe</h2>
          <div className="text-3xl font-bold">{result.iq?.pelne ?? "—"}</div>
          <div className="text-sm text-muted-foreground">wg tabel IQ (do uzupełnienia)</div>
        </Card>
      </div>

      {/* Wykresy słupkowe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarChart data={barDataAll} title="Wszystkie podtesty (WP)" />
        <BarChart data={barDataSlowne} title="Słowne (WP)" />
        <BarChart data={barDataBezslowne} title="Bezsłowne (WP)" />
      </div>
    </section>
  )
}
