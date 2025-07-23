// src/views/TestResultView.tsx
import { useSearchParams, useParams } from "react-router-dom"
import { getResult } from "@/lib/storage"
import Mmpi2Results from "@/views/mmpi2/Mmpi2Results"
import { useEffect, useState } from "react"

export default function TestResultView() {
  const { testId } = useParams()
  const [params] = useSearchParams()
  const id = params.get("id")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!id) return
    getResult(id).then((res) => {
      if (!res) return
      localStorage.setItem("mmpi2-scores", JSON.stringify(res.scores))
      localStorage.setItem("mmpi2-answers", JSON.stringify(res.answers))
      localStorage.setItem("mmpi2-gender", res.gender)
      setLoaded(true)
    })
  }, [id])

  if (!id) {
    return testId === "mmpi2" ? <Mmpi2Results /> : <p>Brak widoku…</p>
  }

  if (!loaded) return <p className="p-4">Ładowanie…</p>

  return testId === "mmpi2" ? <Mmpi2Results /> : <p>Brak widoku…</p>
}
