// app/dxmanager/src/views/waisr/WaisrInput.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const testsSlowne = [
  "Wiadomości",
  "Powtarzanie Cyfr",
  "Słownik",
  "Arytmetyka",
  "Rozumienie",
  "Podobieństwa",
]

const testsBezsłowne = [
  "Braki w Obrazkach",
  "Porządkowanie Obrazków",
  "Klocki",
  "Układanki",
  "Symbole Cyfr",
]

const faktory = [
  "Rozumienie Werbalne",
  "Organizacja Percepcyjna",
  "Pamięć i Odporność na Dystraktory",
]

export default function WaisrInput() {
  const navigate = useNavigate()

  const [age, setAge] = useState("")
  const [gender, setGender] = useState<"M" | "K" | "">("")
  const [rawScores, setRawScores] = useState<Record<string, string>>(
    Object.fromEntries([...testsSlowne, ...testsBezsłowne].map((t) => [t, ""]))
  )

  const handleChange = (test: string, value: string) => {
    setRawScores((prev) => ({ ...prev, [test]: value }))
  }

  const handleSubmit = () => {
    localStorage.setItem(
      "waisr-data",
      JSON.stringify({ age, gender, rawScores })
    )
    navigate("/tests/waisr/results")
  }

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">WAIS-R(PL) – Wyniki surowe</h1>

      {/* Metryczka */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Wiek</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded border px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Płeć</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "M" | "K")}
              className="w-full rounded border px-2 py-1"
            >
              <option value="">— wybierz —</option>
              <option value="M">Mężczyzna</option>
              <option value="K">Kobieta</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Testy słowne */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">TESTY SŁOWNE</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-1">Test</th>
              <th className="py-1 text-center">Wynik surowy (WS)</th>
              <th className="py-1 text-center">Wynik przeliczony (WP)</th>
              <th className="py-1 text-center">P 95%</th>
            </tr>
          </thead>
          <tbody>
            {testsSlowne.map((t) => (
              <tr key={t} className="border-b last:border-none">
                <td>{t}</td>
                <td className="text-center">
                  <input
                    type="number"
                    value={rawScores[t]}
                    onChange={(e) => handleChange(t, e.target.value)}
                    className="w-20 text-center rounded border-2 border-primary"
                    placeholder="WS"
                  />
                </td>
                <td className="text-center bg-green-100 dark:bg-green-900">
                  —
                </td>
                <td className="text-center bg-green-100 dark:bg-green-900">
                  —
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Testy bezsłowne */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">TESTY BEZSŁOWNE</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-1">Test</th>
              <th className="py-1 text-center">Wynik surowy (WS)</th>
              <th className="py-1 text-center">Wynik przeliczony (WP)</th>
              <th className="py-1 text-center">P 95%</th>
            </tr>
          </thead>
          <tbody>
            {testsBezsłowne.map((t) => (
              <tr key={t} className="border-b last:border-none">
                <td>{t}</td>
                <td className="text-center">
                  <input
                    type="number"
                    value={rawScores[t]}
                    onChange={(e) => handleChange(t, e.target.value)}
                    className="w-20 text-center rounded border-2 border-primary"
                    placeholder="WS"
                  />
                </td>
                <td className="text-center bg-green-100 dark:bg-green-900">
                  —
                </td>
                <td className="text-center bg-green-100 dark:bg-green-900">
                  —
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Sumy skali */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">SUMA WYNIKÓW PRZELICZONYCH</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-1">Skala</th>
              <th className="py-1 text-center">Suma WP</th>
              <th className="py-1 text-center">P 95%</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>SKALA SŁOWNA</td>
              <td className="text-center">—</td>
              <td className="text-center">—</td>
            </tr>
            <tr className="border-b">
              <td>SKALA BEZSŁOWNA</td>
              <td className="text-center">—</td>
              <td className="text-center">—</td>
            </tr>
            <tr>
              <td>SKALA PEŁNA</td>
              <td className="text-center">—</td>
              <td className="text-center">—</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* IQ i wyniki czynnikowe */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">IQ</h2>
          <div className="text-center text-2xl font-bold">—</div>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">WYNIKI CZYNNIKOWE</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">Faktor</th>
                <th className="py-1 text-center">Suma WP</th>
                <th className="py-1 text-center">IQ</th>
              </tr>
            </thead>
            <tbody>
              {faktory.map((f) => (
                <tr key={f} className="border-b last:border-none">
                  <td>{f}</td>
                  <td className="text-center">—</td>
                  <td className="text-center">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Przyciski */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Wstecz
        </Button>
        <Button onClick={handleSubmit}>Zapisz i pokaż wyniki</Button>
      </div>
    </section>
  )
}
