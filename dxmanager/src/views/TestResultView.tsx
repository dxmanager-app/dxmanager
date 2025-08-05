// app/dxmanager/src/views/TestResultView.tsx
import { useSearchParams, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getResult } from "@/lib/storage"
import { testRegistry } from "./TestRegistry"

export default function TestResultView() {
  const { testId = "" } = useParams()
  const [params] = useSearchParams()
  const id = params.get("id")

  const [status, setStatus] = useState<"loading" | "notfound" | "ok">("loading")

  useEffect(() => {
    if (!id || !testId) {
      setStatus("notfound")
      return
    }

    getResult(id).then((res) => {
      if (!res) {
        setStatus("notfound")
        return
      }
      testRegistry[testId]?.saveResult?.(res)
      setStatus("ok")
    })
  }, [id, testId])

  if (status === "loading") {
    return <p className="p-4 text-center">Ładowanie…</p>
  }

  if (status === "notfound") {
    return <p className="p-4 text-center">Nie znaleziono wyniku.</p>
  }

  const Component = testRegistry[testId]?.results

  if (!Component) {
    return <p className="p-4 text-center">Nieznany test: {testId}</p>
  }

  return <Component />
}
