// src/logic/waisr/interpretations.ts
// Oficjalne interpretacje jakościowe WAIS-R(PL)

export interface WPInterpretation {
  level: string
  percentile: string
  color: string
}

export interface IQInterpretation {
  category: string
  percentage: string
  color: string
}

export const getWPInterpretation = (wp: number | null): WPInterpretation => {
  if (!wp) return { level: "—", percentile: "—", color: "text-gray-400" }
  
  const interpretations = [
    { wp: 19, level: "bardzo wysoki", percentile: "99,9", color: "text-green-700" },
    { wp: 18, level: "bardzo wysoki", percentile: "99,6", color: "text-green-700" },
    { wp: 17, level: "bardzo wysoki", percentile: "99", color: "text-green-600" },
    { wp: 16, level: "bardzo wysoki", percentile: "98", color: "text-green-600" },
    { wp: 15, level: "wysoki", percentile: "95", color: "text-green-500" },
    { wp: 14, level: "wysoki", percentile: "91", color: "text-green-500" },
    { wp: 13, level: "powyżej przeciętnej", percentile: "84", color: "text-blue-600" },
    { wp: 12, level: "przeciętny", percentile: "75", color: "text-slate-700" },
    { wp: 11, level: "przeciętny", percentile: "63", color: "text-slate-700" },
    { wp: 10, level: "przeciętny", percentile: "50", color: "text-slate-700" },
    { wp: 9, level: "przeciętny", percentile: "37", color: "text-slate-700" },
    { wp: 8, level: "przeciętny", percentile: "25", color: "text-slate-700" },
    { wp: 7, level: "poniżej przeciętnej", percentile: "16", color: "text-orange-600" },
    { wp: 6, level: "niski", percentile: "9", color: "text-red-500" },
    { wp: 5, level: "niski", percentile: "5", color: "text-red-500" },
    { wp: 4, level: "bardzo niski", percentile: "2", color: "text-red-600" },
    { wp: 3, level: "bardzo niski", percentile: "1", color: "text-red-600" },
    { wp: 2, level: "bardzo niski", percentile: "0,4", color: "text-red-700" },
    { wp: 1, level: "bardzo niski", percentile: "0,1", color: "text-red-700" }
  ]
  
  return interpretations.find(i => i.wp === wp) || { level: "—", percentile: "—", color: "text-gray-400" }
}

export const getIQInterpretation = (iq: number | null): IQInterpretation => {
  if (!iq) return { category: "—", percentage: "—", color: "text-gray-400" }
  
  if (iq <= 24) return { category: "Głębokie", percentage: "—", color: "text-red-800" }
  if (iq <= 39) return { category: "Znaczne", percentage: "—", color: "text-red-700" }
  if (iq <= 54) return { category: "Umiarkowane", percentage: "—", color: "text-red-600" }
  if (iq <= 69) return { category: "Lekkie / Upośledzenie umysłowe", percentage: "2,2%", color: "text-red-500" }
  if (iq <= 79) return { category: "Pogranicze upośledzenia", percentage: "6,7%", color: "text-orange-600" }
  if (iq <= 89) return { category: "Poniżej przeciętnej", percentage: "16,1%", color: "text-orange-500" }
  if (iq <= 109) return { category: "Przeciętna", percentage: "50%", color: "text-slate-700" }
  if (iq <= 119) return { category: "Powyżej przeciętnej", percentage: "16,1%", color: "text-blue-600" }
  if (iq <= 129) return { category: "Wysoka", percentage: "6,7%", color: "text-green-600" }
  return { category: "Bardzo wysoka", percentage: "2,2%", color: "text-green-700" }
}