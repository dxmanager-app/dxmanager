import { useEffect, useState } from "react"
import { Gender } from "@/logic/types"
import { generateTestId } from "@/logic/utils/generateTestId"

interface PatientInfoBarProps {
  gender: Gender | null
  setGender: (g: Gender) => void
}

export default function PatientInfoBar({ gender, setGender }: PatientInfoBarProps) {
  const [identifier, setIdentifier] = useState("")
  const [birth, setBirth] = useState("")
  const [examDate, setExamDate] = useState(new Date().toISOString().slice(0, 10))
  const [education, setEducation] = useState("")
  const [occupation, setOccupation] = useState("")
  const [notes, setNotes] = useState("")
  const [testId, setTestId] = useState("")
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    if (birth && examDate && gender) {
      const id = generateTestId(1, new Date(examDate), new Date(birth))
      setTestId(id)
    } else {
      setTestId("")
    }
  }, [birth, examDate, gender])

  const inputStyle = (val: string) =>
    `w-full px-2 py-1 border rounded-md text-[clamp(0.75rem,0.9vw,0.875rem)] transition-all bg-white
     ${val === "" ? "border-red-500 placeholder-red-500" : "border-gray-400"}`

  return (
    <section className="w-full px-4 py-3 bg-[#f5f5f5] border-b border-[#ccc] text-sm">
      <h2 className="text-base font-semibold mb-2 text-[#2c3639]">Dane pacjenta</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
        <div>
          <label className="block mb-1 text-gray-700">Identyfikator</label>
          <input
            type="text"
            placeholder="np. 2025-MMPI-001"
            className={inputStyle(identifier)}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Data urodzenia</label>
          <input
            type="date"
            placeholder="rrrr-mm-dd"
            className={inputStyle(birth)}
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>

        <div className={`flex items-center gap-2 ${gender === null ? "border border-red-500 rounded-md px-2 py-0.5" : ""}`}>
          <span className="text-gray-700">Płeć:</span>
          <button
            className={`px-2 py-1 rounded-md border-[2.5px] text-[clamp(0.75rem,0.9vw,0.875rem)] font-semibold transition-all
              ${gender === "K"
                ? "bg-[#a27b5c] text-white border-[#5a3c2d]"
                : "bg-white border-[#2c3639] text-[#2c3639] hover:bg-[#eee9e3]"}`}
            onClick={() => setGender("K")}
          >
            K
          </button>
          <button
            className={`px-2 py-1 rounded-md border-[2.5px] text-[clamp(0.75rem,0.9vw,0.875rem)] font-semibold transition-all
              ${gender === "M"
                ? "bg-[#a27b5c] text-white border-[#5a3c2d]"
                : "bg-white border-[#2c3639] text-[#2c3639] hover:bg-[#eee9e3]"}`}
            onClick={() => setGender("M")}
          >
            M
          </button>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Data badania</label>
          <input
            type="date"
            className={inputStyle(examDate)}
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Wykształcenie</label>
          <select
            className={inputStyle(education)}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Wybierz...</option>
            <option value="podstawowe">Podstawowe</option>
            <option value="średnie">Średnie</option>
            <option value="wyższe">Wyższe</option>
            <option value="inne">Inne</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Zawód</label>
          <input
            type="text"
            placeholder="np. nauczyciel"
            className={inputStyle(occupation)}
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">ID badania</label>
          <input
            type="text"
            readOnly
            value={testId}
            className="w-full px-2 py-1 border border-gray-400 rounded-md bg-gray-100 text-sm text-[#2c3639]"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Czas rozwiązywania (min)</label>
          <input
            type="number"
            min={0}
            className="w-full px-2 py-1 border border-gray-400 rounded-md text-sm"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div className="sm:col-span-2 md:col-span-3 lg:col-span-6">
          <label className="block mb-1 text-gray-700">Uwagi</label>
          <textarea
            placeholder="Dodatkowe informacje, np. stan zdrowia, ważne obserwacje..."
            className="w-full px-2 py-1 border border-gray-400 rounded-md text-[clamp(0.75rem,0.9vw,0.875rem)] bg-white min-h-[60px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
    </section>
  )
}
