import { Gender, Mmpi2Scores, ScoreMode } from "@/logic/mmpi2/types"
import { calculateScores } from "@/logic/mmpi2/calculate"
import { Card } from "@/components/ui/card"

interface ScoreSummaryProps {
  answers: (1 | 0 | null)[]
  gender: Gender
  mode: ScoreMode
}

export default function ScoreSummary({ answers, gender, mode }: ScoreSummaryProps) {
  const scores: Mmpi2Scores = calculateScores(answers, gender)

  const scaleGroups: Record<string, string[]> = {
    "Skale kontrolne": ["VRIN", "TRIN", "F", "Fb", "F-K", "L", "K"],
    "Skale kliniczne": ["Hs", "D", "Hy", "Pd", "Mf", "Pa", "Pt", "Sc", "Ma", "Si"],
    "Skale treściowe": ["ANX", "FRS", "OBS", "DEP", "HEA", "BIZ", "ANG", "CYN", "ASP", "TPR", "WRK", "TRT"],
  }

  return (
    <div className="space-y-6">
      {Object.entries(scaleGroups).map(([groupName, scaleKeys]) => (
        <Card key={groupName} className="p-4">
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
        </Card>
      ))}
    </div>
  )
}
