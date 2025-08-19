// app/dxmanager/src/components/waisr/SubtestInput.tsx
import { Input } from "@/components/ui/input"

interface SubtestInputProps {
  subtest: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function SubtestInput({ subtest, value, onChange, disabled }: SubtestInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-56 font-medium text-right">{subtest}</div>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-20"
      />
    </div>
  )
}

export default SubtestInput
