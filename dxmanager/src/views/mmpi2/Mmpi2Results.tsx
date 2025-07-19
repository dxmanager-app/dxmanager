// src/views/mmpi2/Mmpi2Results.tsx

import { useParams } from "react-router-dom"
import { useState } from "react"
import { scaleLabels } from "@/logic/mmpi2/scaleLabels"

export default function Mmpi2Results() {
  const { testId } = useParams()
  const stored = localStorage.getItem("mmpi2-scores")
  const scores = stored ? (JSON.parse(stored) as Record<string, { raw: number; t?: number; k?: number }>) : null
  const [mode, setMode] = useState<"t" | "k" | "raw">("t")

  if (!scores || Object.keys(scores).length === 0) {
    return (
      <div className="p-4 text-center">
        <p>Brak wyników do wyświetlenia dla testu: {testId}</p>
      </div>
    )
  }

  const getScore = (s: { raw: number; t?: number; k?: number }) => {
    if (mode === "t" && s.t !== undefined) return s.t
    if (mode === "k" && s.k !== undefined) return s.k
    return s.raw
  }

  const renderGroup = (title: string, keys: string[]) => (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-6 mb-2">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2">
        {keys.map((key) => {
          const s = scores[key]
          if (!s) return null
          return (
            <div
              key={key}
              title={scaleLabels[key]?.pl || scaleLabels[key]?.en || key}
              className="flex flex-col items-center justify-center text-sm text-gray-900 bg-white border rounded shadow-sm p-1"
            >
              <div className="text-[11px] text-muted-foreground leading-none">{key}</div>
              <div className="font-mono text-[13px] leading-none">{getScore(s)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h1 className="text-xl font-semibold">Wyniki testu: {testId}</h1>
        <div className="flex gap-2">
          <button
            className={`px-2 py-1 rounded border text-sm ${mode === "t" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setMode("t")}
          >
            Skala tenowa (T)
          </button>
          <button
            className={`px-2 py-1 rounded border text-sm ${mode === "k" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setMode("k")}
          >
            Skala kontrolna (K)
          </button>
          <button
            className={`px-2 py-1 rounded border text-sm ${mode === "raw" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setMode("raw")}
          >
            Surowe wyniki
          </button>
        </div>
      </div>

      {renderGroup("VRIN & TRIN", ["VRIN", "TRIN"])}
      {renderGroup("Skale kontrolne i kliniczne", [
        "L", "F", "Fb", "Fp", "K", "S", "Hs", "D", "Hy", "Pd", "Mf", "Pa", "Pt", "Sc", "Ma", "Si"
      ])}
      {renderGroup("Skale Harris-Lingoesa", [
        "D1", "D2", "D3", "D4", "D5",
        "Hy1", "Hy2", "Hy3", "Hy4", "Hy5",
        "Pd1", "Pd2", "Pd3", "Pd4", "Pd5",
        "Pa1", "Pa2", "Pa3",
        "Sc1", "Sc2", "Sc3", "Sc4", "Sc5", "Sc6",
        "Ma1", "Ma2", "Ma3", "Ma4"
      ])}
      {renderGroup("Podskale Si", ["Si1", "Si2", "Si3"])}
      {renderGroup("Skale treściowe", [
        "ANG", "ANX", "ASP", "BIZ", "CYN", "DEP", "FAM", "FRS", "HEA", "LSE", "OBS", "SOD", "TPA", "TRT", "WRK"
      ])}
      {renderGroup("Podskale treściowe", [
        "ANG1", "ANG2", "ASP1", "ASP2", "BIZ1", "BIZ2", "CYN1", "CYN2", "DEP1", "DEP2", "DEP3",
        "DEP4", "FAM1", "FAM2", "FRS1", "FRS2", "HEA1", "HEA2", "HEA3", "LSE1", "LSE2",
        "SOD1", "SOD2", "TPA1", "TPA2", "TRT1", "TRT2"
      ])}
      {renderGroup("Skale dodatkowe – kliniczne", ["A", "R", "Es", "Do", "Re", "Mt", "PK", "MDS"])}
      {renderGroup("Skale dodatkowe – inne", ["Ho", "O-H", "MAC-R", "AAS", "APS", "GM", "GF"])}
      {renderGroup("Zrestrukturyzowane skale kliniczne", [
        "RCd", "RC1", "RC2", "RC3", "RC4", "RC6", "RC7", "RC8", "RC9"
      ])}
    </div>
  )
}
