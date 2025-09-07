// app/dxmanager/src/views/waisr/WaisrResults.tsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getResult } from "@/lib/storage"
import { calculateWaisr } from "@/logic/waisr/calculate"
import type { CalculatedResult } from "@/logic/waisr/types"
import WaisrTable from "./WaisrTable"
import { PatientSection } from "./PatientSection"

export default function WaisrResults() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<CalculatedResult | null>(null)

  useEffect(() => {
    if (!id) return
    getResult(id).then((r) => {
      if (!r) return
      const result = calculateWaisr({
        mode: "basic",
        age: r.scores.age as number,
        gender: r.gender,
        raw: r.scores.rawScores as any,
      })
      setData(result)
    })
  }, [id])

  if (!data) return <div>Ładowanie…</div>

  return (
    <div className="flex flex-col gap-4 p-4">
      <PatientSection
        gender={data.gender}
        birthDate={""}
        examDate={""}
        age={data.age}
        onGenderChange={() => {}}
        onBirthDateChange={() => {}}
        onExamDateChange={() => {}}
      />
      <WaisrTable
        rawScores={{}}
        result={data}
        onChange={() => {}}
      />
    </div>
  )
}
