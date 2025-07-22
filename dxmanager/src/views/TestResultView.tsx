// src/views/TestResultView.tsx
import { useSearchParams, useParams } from "react-router-dom"
import { getResult } from "@/lib/storage"
import Mmpi2Results from "@/views/mmpi2/Mmpi2Results"

export default function TestResultView() {
  const { testId } = useParams()
  const [params] = useSearchParams()
  const id = params.get("id")

  // jeśli brak id → renderuj wyniki „na żywo”
  if (!id) {
    return testId === "mmpi2" ? <Mmpi2Results /> : <p>Brak widoku…</p>
  }

  const res = getResult(id)
  if (!res) return <p className="p-4">Nie znaleziono wyniku.</p>

  // wczytujemy do localStorage tych samych kluczy,
  // żeby Mmpi2Results mogło go użyć bez refaktoru
  localStorage.setItem("mmpi2-scores", JSON.stringify(res.scores))
  localStorage.setItem("mmpi2-answers", JSON.stringify(res.answers))
  localStorage.setItem("mmpi2-gender", res.gender)

  return testId === "mmpi2" ? <Mmpi2Results /> : <p>Brak widoku…</p>
}
