// app/dxmanager/src/views/waisr/PatientSection.tsx
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { calculateAge } from "@/lib/date/calculateAge"
import type { Gender } from "@/logic/waisr/types"

type PatientSectionProps = {
  data: any
  onChange: (data: any) => void
}

const FEMALE: Gender = "K"
const MALE: Gender = "M"

export default function PatientSection({ data, onChange }: PatientSectionProps) {
  const [localData, setLocalData] = useState(data)

  useEffect(() => {
    setLocalData(data)
  }, [data])

  const handleChange = (field: string, value: string) => {
    const updated = {
      ...localData,
      [field]: value,
    }

    if (updated.birthDate && updated.examDate) {
      updated.age = String(calculateAge(updated.birthDate, updated.examDate))
    }

    setLocalData(updated)
    onChange(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dane pacjenta</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label>Imię</Label>
          <Input value={localData?.firstName ?? ""} onChange={(e) => handleChange("firstName", e.target.value)} />
        </div>
        <div>
          <Label>Nazwisko</Label>
          <Input value={localData?.lastName ?? ""} onChange={(e) => handleChange("lastName", e.target.value)} />
        </div>
        <div>
          <Label>Płeć</Label>
          <Select value={localData?.gender ?? ""} onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger><SelectValue placeholder="Wybierz" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={FEMALE}>Kobieta</SelectItem>
              <SelectItem value={MALE}>Mężczyzna</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Data urodzenia</Label>
          <Input type="date" value={localData?.birthDate ?? ""} onChange={(e) => handleChange("birthDate", e.target.value)} />
        </div>
        <div>
          <Label>Data badania</Label>
          <Input type="date" value={localData?.examDate ?? ""} onChange={(e) => handleChange("examDate", e.target.value)} />
        </div>
        <div>
          <Label>Wiek (obliczony)</Label>
          <Input value={localData?.age ?? ""} disabled />
        </div>
      </CardContent>
    </Card>
  )
}
