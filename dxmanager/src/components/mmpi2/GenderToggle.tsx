import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Gender } from "@/logic/types"

export interface GenderToggleProps {
  value: Gender
  onChange: (value: Gender) => void
}

export default function GenderToggle({ value, onChange }: GenderToggleProps) {
  return (
    <ToggleGroup type="single" value={value} onValueChange={(val) => val && onChange(val as Gender)}>
      <ToggleGroupItem value="female">Kobieta</ToggleGroupItem>
      <ToggleGroupItem value="male">Mężczyzna</ToggleGroupItem>
    </ToggleGroup>
  )
}
