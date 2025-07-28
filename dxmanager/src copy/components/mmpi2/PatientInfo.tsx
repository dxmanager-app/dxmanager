// src/components/mmpi2/PatientInfo.tsx

import { Gender } from "@/logic/types"

interface PatientInfoProps {
  gender: Gender | null
  setGender: (g: Gender) => void
}

export default function PatientInfo({ gender, setGender }: PatientInfoProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 bg-[#f3f2ee] p-4 rounded-lg border border-[#ddd]">
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Imię i nazwisko</label>
        <input type="text" className="px-2 py-1 border rounded-md w-48 text-sm" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Data urodzenia</label>
        <input type="date" className="px-2 py-1 border rounded-md w-40 text-sm" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Płeć</label>
        <div className="flex gap-2">
          <button
            onClick={() => setGender("F")}
            className={`px-3 py-1 text-sm rounded-md border-2 transition
              ${gender === "F"
                ? "bg-blue-700 text-white border-blue-800"
                : "bg-white border-gray-300 hover:bg-blue-50"}`}
          >
            K
          </button>
          <button
            onClick={() => setGender("M")}
            className={`px-3 py-1 text-sm rounded-md border-2 transition
              ${gender === "M"
                ? "bg-blue-700 text-white border-blue-800"
                : "bg-white border-gray-300 hover:bg-blue-50"}`}
          >
            M
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Data badania</label>
        <input type="date" className="px-2 py-1 border rounded-md w-40 text-sm" defaultValue={new Date().toISOString().slice(0, 10)} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Wykształcenie</label>
        <select className="px-2 py-1 border rounded-md w-40 text-sm">
          <option>Podstawowe</option>
          <option>Zawodowe</option>
          <option>Średnie</option>
          <option>Wyższe</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Zawód</label>
        <input type="text" className="px-2 py-1 border rounded-md w-48 text-sm" />
      </div>
    </div>
  )
}
