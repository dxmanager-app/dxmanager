import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ScoreMode } from "@/logic/mmpi2/types"

interface ScoreModeToggleProps {
  mode: ScoreMode
  onChange: (value: ScoreMode) => void
}

export default function ScoreModeToggle({ mode, onChange }: ScoreModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(val: string) => {
        if (val === "t" || val === "k" || val === "raw") onChange(val as ScoreMode)
      }}
    >
      <ToggleGroupItem value="t">T</ToggleGroupItem>
      <ToggleGroupItem value="k">K</ToggleGroupItem>
      <ToggleGroupItem value="raw">Raw</ToggleGroupItem>
    </ToggleGroup>
  )
}
