import { useSearchParams, useParams } from "react-router-dom"
import { getResult } from "@/lib/storage"
import Mmpi2Results from "@/views/mmpi2/Mmpi2Results"
import { useEffect, useState } from "react"

export default function TestResultView() {
  const { testId } = useParams()
  const [params] = useSearchParams()
  const id = params.get("id")

  const [status, setStatus] = useState<"loading" | "notfound" | "ok">("loading")

  useEffect(() => {
    console.log(">>> TestResultView – URL id =", id)
    if (!id) {
      setStatus("notfound")
      return
    }

    getResult(id).then((res) => {
      if (!res) {
        console.log(">>> TestResultView – nie znaleziono wyniku dla id =", id)
        setStatus("notfound")
        return
      }

      console.log(">>> TestResultView – znaleziono wynik:", res)

      // zapisujemy dane wyniku w localStorage tylko raz
      localStorage.setItem("mmpi2-scores", JSON.stringify(res.scores))
      localStorage.setItem("mmpi2-answers", JSON.stringify(res.answers))
      localStorage.setItem("mmpi2-gender", res.gender)

      setStatus("ok")
    })
  }, [id])

  if (status === "loading") {
    return <p className="p-4 text-center">Ładowanie…</p>
  }

  if (status === "notfound") {
    return <p className="p-4 text-center">Nie znaleziono wyniku.</p>
  }

  // tu pokazujemy wyłącznie widok wyników
  if (testId === "mmpi2") {
    return <Mmpi2Results />
  }

  return <p className="p-4 text-center">Brak widoku dla testu: {testId}</p>
}
