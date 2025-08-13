import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

/**
 * WAIS‑R (tryb uproszczony)
 * - Użytkownik wpisuje tylko WS (wyniki surowe) dla subtestów.
 * - Płeć w standardzie: "M" / "F".
 * - Wiek: number lub pusty string.
 * - Po "Zapisz": zapis do localStorage("waisr-data") i przekierowanie do /tests/waisr/results.
 *
 * Format localStorage:
 * {
 *   age: string,
 *   gender: "M" | "F",
 *   rawScores: Record<string, string>
 * }
 */

// Lista subtestów (na podstawie Excela „WAIS-R Wyniki.xlsx”).
const SUBTESTS = [
  "Wiadomości",
  "Powtarzanie Cyfr",
  "Słownik",
  "Arytmetyka",
  "Rozumienie",
  "Podobieństwa",
  "Braki w Obrazkach",
  "Porządkowanie Obrazków",
  "Klocki",
  "Układanki",
  "Symbole Cyfr",
] as const

type SubtestName = (typeof SUBTESTS)[number]
type Gender = "M" | "F"

type WaisrFormData = {
  age: string
  gender: Gender
  rawScores: Record<SubtestName, string>
}

const STORAGE_KEY = "waisr-data"

export default function WaisrInputView() {
  const navigate = useNavigate()

  // Domyślne wartości formularza
  const defaultData: WaisrFormData = useMemo(
    () => ({
      age: "",
      gender: "F", // startowo F, ale i tak użytkownik wybierze
      rawScores: SUBTESTS.reduce((acc, name) => {
        acc[name] = ""
        return acc
      }, {} as Record<SubtestName, string>),
    }),
    []
  )

  const [form, setForm] = useState<WaisrFormData>(defaultData)

  // Prefill z localStorage (jeśli istnieje)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Partial<WaisrFormData> | null
      if (!parsed || typeof parsed !== "object") return

      setForm((prev) => {
        const next: WaisrFormData = {
          age: prev.age,
          gender: prev.gender,
          rawScores: { ...prev.rawScores },
        }

        if (typeof parsed.age === "string") next.age = parsed.age
        if (parsed.gender === "M" || parsed.gender === "F") next.gender = parsed.gender
        if (parsed.rawScores && typeof parsed.rawScores === "object") {
          for (const key of SUBTESTS) {
            const val = (parsed.rawScores as Record<string, unknown>)[key]
            if (typeof val === "string") next.rawScores[key] = val
          }
        }
        return next
      })
    } catch {
      // Ignorujemy uszkodzone dane w storage
    }
  }, [])

  // Handlery pól
  const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, age: e.target.value })) // może być pusty string
  }

  const onChangeGender = (value: string) => {
    const g: Gender = value === "M" ? "M" : "F"
    setForm((f) => ({ ...f, gender: g }))
  }

  const onChangeWS = (name: SubtestName, value: string) => {
    setForm((f) => ({
      ...f,
      rawScores: {
        ...f.rawScores,
        [name]: value, // na razie bez twardej walidacji zakresów
      },
    }))
  }

  const onReset = () => setForm(defaultData)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Zapis w wymaganym formacie
    const payload: WaisrFormData = {
      age: form.age ?? "",
      gender: form.gender,
      rawScores: SUBTESTS.reduce((acc, key) => {
        acc[key] = form.rawScores[key] ?? ""
        return acc
      }, {} as Record<SubtestName, string>),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    navigate("/tests/waisr/results")
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">WAIS‑R — dane wejściowe (tryb uproszczony)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Dane ogólne */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Wiek</Label>
                <Input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  placeholder="np. 34"
                  value={form.age}
                  onChange={onChangeAge}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Płeć</Label>
                <Select value={form.gender} onValueChange={onChangeGender}>
                  <SelectTrigger id="gender" className="w-full">
                    <SelectValue placeholder="Wybierz płeć" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="F">F</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* WS — wyróżnione pola */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">Wyniki surowe (WS)</h3>
                <p className="text-sm text-muted-foreground">
                  W trybie uproszczonym wpisz tylko WS. Wyniki przeliczone (WP) obliczy logika.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUBTESTS.map((name) => (
                  <div key={name} className="space-y-1">
                    <Label htmlFor={`ws-${name}`}>{name}</Label>
                    <Input
                      id={`ws-${name}`}
                      type="number"
                      inputMode="numeric"
                      placeholder="WS"
                      value={form.rawScores[name]}
                      onChange={(e) => onChangeWS(name, e.target.value)}
                      className="font-semibold"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={onReset}>
                Wyczyść
              </Button>
              <Button type="submit">Zapisz</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
