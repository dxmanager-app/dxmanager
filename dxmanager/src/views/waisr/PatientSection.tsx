// app/dxmanager/src/views/waisr/PatientSection.tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gender } from "@/logic/waisr/types"

export interface PatientSectionProps {
  gender: Gender
  birthDate: string
  examDate: string
  age: number
  onGenderChange: (value: Gender) => void
  onBirthDateChange: (value: string) => void
  onExamDateChange: (value: string) => void
}

export function PatientSection({
  gender,
  birthDate,
  examDate,
  age,
  onGenderChange,
  onBirthDateChange,
  onExamDateChange,
}: PatientSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Płeć</Label>
        <Select value={gender} onValueChange={(value) => onGenderChange(value as Gender)}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="M">Mężczyzna</SelectItem>
            <SelectItem value="K">Kobieta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Data urodzenia</Label>
        <Input type="date" value={birthDate} onChange={(e) => onBirthDateChange(e.target.value)} />
      </div>

      <div>
        <Label>Data badania</Label>
        <Input type="date" value={examDate} onChange={(e) => onExamDateChange(e.target.value)} />
      </div>

      <div>
        <Label>Wiek (lata)</Label>
        <Input type="number" value={age.toString()} readOnly />
      </div>
    </div>
  )
}
