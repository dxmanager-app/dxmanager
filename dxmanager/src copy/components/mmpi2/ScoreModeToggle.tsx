// src/components/mmpi2/ScoreModeToggle.tsx

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Mode } from "@/logic/mmpi2/types"

interface ScoreModeToggleProps {
  mode: Mode
  onChange: (value: Mode) => void
}

export default function ScoreModeToggle({ mode, onChange }: ScoreModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(val: string) => {
        if (val === "ten" || val === "k" || val === "raw") onChange(val as Mode)
      }}
    >
      <ToggleGroupItem value="ten">T</ToggleGroupItem>
      <ToggleGroupItem value="k">K</ToggleGroupItem>
      <ToggleGroupItem value="raw">Raw</ToggleGroupItem>
    </ToggleGroup>
  )
} 
