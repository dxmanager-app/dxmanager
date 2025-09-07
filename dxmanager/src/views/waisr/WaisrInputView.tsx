// app/dxmanager/src/views/waisr/WaisrInputView.tsx
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateAge } from "@/lib/date/calculateAge"
import { calculateWaisr, ALL_SUBTESTS } from "@/logic/waisr/calculate"
import { Gender } from "@/logic/waisr/types"
import { PatientSection } from "./PatientSection"
import WaisrTable from "./WaisrTable"

export default function WaisrInputView() {
  const [gender, setGender] = useState<Gender>("K")
  const [birthDate, setBirthDate] = useState("")
  const [examDate, setExamDate] = useState("")
  const [rawScores, setRawScores] = useState<Record<string, string>>({})

  const age = useMemo(() => {
    const birth = birthDate ? new Date(birthDate) : null
    const exam = examDate ? new Date(examDate) : null
    if (!birth || !exam) return 0
    return calculateAge(birth, exam).years
  }, [birthDate, examDate])

  const result = useMemo(() => {
    if (!age || !gender || !rawScores) return null
    return calculateWaisr({
      mode: "basic",
      age,
      gender,
      raw: rawScores,
    })
  }, [age, gender, rawScores])

  const handleScoreChange = (subtest: string, value: string) => {
    setRawScores((prev) => ({
      ...prev,
      [subtest]: value,
    }))
  }

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dane pacjenta</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientSection
            gender={gender}
            birthDate={birthDate}
            examDate={examDate}
            age={age}
            onGenderChange={setGender}
            onBirthDateChange={setBirthDate}
            onExamDateChange={setExamDate}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wyniki surowe i przeliczone</CardTitle>
        </CardHeader>
        <CardContent>
          <WaisrTable
            rawScores={rawScores}
            result={result}
            onChange={handleScoreChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}
