// app/dxmanager/src/components/waisr/PatientSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gender } from "@/logic/waisr/types"

interface PatientSectionProps {
  firstName: string
  lastName: string
  pesel: string
  gender: Gender
  birthDate: string
  onChange: (field: keyof PatientSectionProps, value: string) => void
}

export function PatientSection({
  firstName,
  lastName,
  pesel,
  gender,
  birthDate,
  onChange,
}: PatientSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dane pacjenta</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <Label>Imię</Label>
          <Input value={firstName} onChange={(e) => onChange("firstName", e.target.value)} />
        </div>
        <div>
          <Label>Nazwisko</Label>
          <Input value={lastName} onChange={(e) => onChange("lastName", e.target.value)} />
        </div>
        <div>
          <Label>PESEL</Label>
          <Input value={pesel} onChange={(e) => onChange("pesel", e.target.value)} />
        </div>
        <div>
          <Label>Płeć</Label>
          <Select value={gender} onValueChange={(value: Gender) => onChange("gender", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Mężczyzna</SelectItem>
              <SelectItem value="K">Kobieta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Data urodzenia</Label>
          <Input type="date" value={birthDate} onChange={(e) => onChange("birthDate", e.target.value)} />
        </div>
      </CardContent>
    </Card>
  )
}
