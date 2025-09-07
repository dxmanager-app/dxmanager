// src/views/waisr/PatientSection.tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Gender } from "@/logic/waisr/types"
import { calculateAge } from "@/lib/date/calculateAge"
import { useEffect } from "react"

interface PatientSectionProps {
  gender: Gender
  birthDate: string
  examDate: string
  age: number
  setGender: (value: Gender) => void
  setBirthDate: (value: string) => void
  setExamDate: (value: string) => void
  setAge: (value: number) => void
}

export function PatientSection({
  gender,
  setGender,
  birthDate,
  setBirthDate,
  examDate,
  setExamDate,
  age,
  setAge,
}: PatientSectionProps) {
  useEffect(() => {
    if (birthDate && examDate) {
      const calculated = calculateAge(new Date(birthDate), new Date(examDate))
      setAge(calculated.years)
    }
  }, [birthDate, examDate])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="grid gap-2">
        <Label>Płeć</Label>
<Select value={gender} onValueChange={(v: Gender) => setGender(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="K">Kobieta</SelectItem>
            <SelectItem value="M">Mężczyzna</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Data urodzenia</Label>
        <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Data badania</Label>
        <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Wiek</Label>
        <Input value={age.toString()} readOnly />
      </div>
    </div>
  )
}
