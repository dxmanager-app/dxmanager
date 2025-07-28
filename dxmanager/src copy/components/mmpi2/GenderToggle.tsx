import { Gender } from "@/logic/types"

interface GenderToggleProps {
  value: Gender | null
  onChange: (gender: Gender) => void
}

export default function GenderToggle({ value, onChange }: GenderToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Płeć:</span>
      <button
        type="button"
        onClick={() => onChange("F")}
        className={`px-4 py-1 text-sm font-medium rounded-md border-2 shadow-sm transition-all
          ${value === "F"
            ? "bg-[#8aa7a9] text-white border-[#799293]"
            : "bg-[#f7f5f1] text-[#333] border-[#bbb] hover:bg-[#e2e0db]"}
        `}
      >
        K
      </button>
      <button
        type="button"
        onClick={() => onChange("M")}
        className={`px-4 py-1 text-sm font-medium rounded-md border-2 shadow-sm transition-all
          ${value === "M"
            ? "bg-[#8aa7a9] text-white border-[#799293]"
            : "bg-[#f7f5f1] text-[#333] border-[#bbb] hover:bg-[#e2e0db]"}
        `}
      >
        M
      </button>
    </div>
  )
}
