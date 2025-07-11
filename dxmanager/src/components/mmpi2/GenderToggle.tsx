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
        onClick={() => onChange("female")}
        className={`px-4 py-1 text-sm font-medium rounded-md border-2 shadow-sm transition-all
          ${value === "female"
            ? "bg-lime-600 text-white border-lime-700"
            : "bg-background text-foreground border-gray-400 hover:bg-accent"}
        `}
      >
        K
      </button>
      <button
        type="button"
        onClick={() => onChange("male")}
        className={`px-4 py-1 text-sm font-medium rounded-md border-2 shadow-sm transition-all
          ${value === "male"
            ? "bg-lime-600 text-white border-lime-700"
            : "bg-background text-foreground border-gray-400 hover:bg-accent"}
        `}
      >
        M
      </button>
    </div>
  )
}
