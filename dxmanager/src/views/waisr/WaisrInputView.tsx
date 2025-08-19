// app/dxmanager/src/views/waisr/WaisrInputView.tsx

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { calculateAge } from "@/lib/date/calculateAge"
import { calculateWaisr, SUBTESTS_SLOWNE, SUBTESTS_BEZSLOWNE, ALL_SUBTESTS } from "@/logic/waisr/calculate"
import { Gender } from "@/logic/waisr/types"
import { getFromStorage, setToStorage } from "@/lib/storage"
import ScoresTable from "./ScoresTable"
import SubtestInput from "./SubtestInput"
import PatientSection from "./PatientSection"

// ———————————————————————————————————————————————
// Typy i stałe
// ———————————————————————————————————————————————

type WaisrData = {
  gender: Gender
  birthDate: string
  examDate: string
  age: number
  rawScores: Record<string, string>
}

const FEMALE: Gender = "K"
const MALE: Gender = "M"
const LS_WAISR_DATA = "waisr-data"

export default function WaisrInputView() {
  const [gender, setGender] = useState<Gender>(FEMALE)
  const [birthDate, setBirthDate] = useState("")
  const [examDate, setExamDate] = useState("")
  const [rawScores, setRawScores] = useState<Record<string, string>>({})

  const age = useMemo(() => {
    try {
      const d = calculateAge(new Date(birthDate), new Date(examDate))
      return d.years
    } catch {
      return 0
    }
  }, [birthDate, examDate])

  const result = useMemo(() => {
    try {
      return calculateWaisr({ mode: "basic", age, gender, raw: parseRawScores(rawScores) })
    } catch {
      return null
    }
  }, [rawScores, gender, age])

  useEffect(() => {
    const saved = getFromStorage<WaisrData>(LS_WAISR_DATA, null)
    if (saved) {
      setGender(saved.gender)
      setBirthDate(saved.birthDate)
      setExamDate(saved.examDate)
      setRawScores(saved.rawScores)
    }
  }, [])

  useEffect(() => {
    const data: WaisrData = { gender, birthDate, examDate, age, rawScores }
    setToStorage(LS_WAISR_DATA, data)
  }, [gender, birthDate, examDate, rawScores, age])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dane pacjenta</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientSection
            gender={gender}
            setGender={setGender}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            examDate={examDate}
            setExamDate={setExamDate}
            age={age}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wyniki surowe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ALL_SUBTESTS.map((subtest) => (
            <SubtestInput
              key={subtest}
              subtest={subtest}
              value={rawScores[subtest] || ""}
              onChange={(value: string) =>
                setRawScores((prev) => ({ ...prev, [subtest]: value }))
              }
            />
          ))}
        </CardContent>
      </Card>

      <ScoresTable result={result} />
    </div>
  )
}

function parseRawScores(raw: Record<string, string>): Record<string, number | null> {
  const out: Record<string, number | null> = {}
  for (const [k, v] of Object.entries(raw)) {
    const parsed = parseInt(v)
    out[k] = isNaN(parsed) ? null : parsed
  }
  return out
}
