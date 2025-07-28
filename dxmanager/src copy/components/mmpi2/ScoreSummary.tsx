// src/components/mmpi2/ScoreSummary.tsx

import { Gender, Mmpi2Scores } from "@/logic/mmpi2/types"
import { calculateScores } from "@/logic/mmpi2/calculate"

interface ScoreSummaryProps {
  answers: (1 | 0 | null)[]
  gender: Gender
}

export default function ScoreSummary({ answers, gender }: ScoreSummaryProps) {
  const mappedAnswers = answers.map((a) => (a === 1 ? "T" : a === 0 ? "F" : null))
  const scores: Mmpi2Scores = calculateScores(mappedAnswers, gender)

  const scaleGroups: Record<string, string[]> = {
    "Skale kontrolne": ["VRIN", "TRIN", "F", "Fb", "F-K", "L", "K"],
    "Skale kliniczne": ["Hs", "D", "Hy", "Pd", "Mf", "Pa", "Pt", "Sc", "Ma", "Si"],
    "Skale treściowe": ["ANX", "FRS", "OBS", "DEP", "HEA", "BIZ", "ANG", "CYN", "ASP", "TPR", "WRK", "TRT"],
  }

  return (
    <div className="space-y-6">
      {Object.entries(scaleGroups).map(([groupName, scaleKeys]) => (
        <div key={groupName} className="p-4 border rounded-md shadow-sm bg-white dark:bg-muted">
          <h3 className="font-semibold mb-2">{groupName}</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 pr-4">Skala</th>
                <th className="text-left py-1 pr-4">Raw</th>
                <th className="text-left py-1 pr-4">T</th>
                <th className="text-left py-1 pr-4">K</th>
              </tr>
            </thead>
            <tbody>
              {scaleKeys.map((scale) => {
                const result = scores[scale]
                if (!result) return null
                return (
                  <tr key={scale} className="border-b last:border-none">
                    <td className="py-1 pr-4 font-medium">{scale}</td>
                    <td className="py-1 pr-4">{result.raw ?? "-"}</td>
                    <td className="py-1 pr-4">{result.t ?? "-"}</td>
                    <td className="py-1 pr-4">{result.k ?? "-"}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
