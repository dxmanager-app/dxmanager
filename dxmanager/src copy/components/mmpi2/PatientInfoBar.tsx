// src/components/mmpi2/PatientInfoBar.tsx
import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  onGenderSelect: (g: "M" | "F" | null) => void
}

/** Pasek danych pacjenta – „Płeć” jest wymagane */
export default function PatientInfoBar({ onGenderSelect }: Props) {
  // ⬇️  DOMYŚLNIE brak wyboru — puste pole
  const [gender, setGender] = useState<"M" | "F" | "">("")

  return (
    <section className="mb-4 rounded-xl bg-muted/50 p-3 lg:p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* PŁEĆ (wymagane) */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-muted-foreground">
            Płeć <span className="text-destructive">*</span>
          </label>

          <select
            className={cn(
              "input rounded-md bg-background text-foreground",
              "dark:bg-background dark:text-black", // biały tekst w natywnym menu
              !gender && "border-destructive focus:border-destructive"
            )}
            required
            value={gender}
            onChange={(e) => {
              const val = e.target.value as "M" | "F" | ""
              setGender(val)

              // zapis / czyszczenie localStorage
              if (val) {
                localStorage.setItem("mmpi2-gender", val)
                onGenderSelect(val)
              } else {
                localStorage.removeItem("mmpi2-gender")
                onGenderSelect(null)
              }
            }}
          >
            <option value="">– wybierz –</option>
            <option value="M">Mężczyzna</option>
            <option value="F">Kobieta</option>
          </select>

          {!gender && (
            <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
              <AlertTriangle size={12} /> Wybór płci jest wymagany
            </p>
          )}
        </div>

        {/* … dodaj pozostałe pola wg potrzeb … */}
      </div>
    </section>
  )
}
