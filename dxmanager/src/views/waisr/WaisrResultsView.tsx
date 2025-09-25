// src/views/waisr/WaisrResultsView.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ALL_SUBTESTS, SUBTESTS_SLOWNE, SUBTESTS_BEZSLOWNE } from '@/logic/waisr/calculate'
import { getWPInterpretation, getIQInterpretation } from '@/logic/waisr/interpretations'
import type { CalculatedResult } from '@/logic/waisr/types'

type Props = {
  result: CalculatedResult
  rawScores: Record<string, string>
  onEdit: () => void
  onSaveReport: () => void
}

export default function WaisrResultsView({ result, rawScores, onEdit, onSaveReport }: Props) {
  // Funkcja do formatowania przedziałów ufności w formacie: 5 (7) 9
  const formatConfidenceInterval = (value: number, lower: number, upper: number) => {
    return `${lower} (${value}) ${upper}`
  }

  // Wyniki IQ z przedziałami ufności
  const renderIQResults = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Słowny IQ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-blue-700">Słowny IQ (VIQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{result.iq?.slowne || "—"}</div>
            <Badge className={getIQInterpretation(result.iq?.slowne ?? null).color}>
              {getIQInterpretation(result.iq?.slowne ?? null).category}
            </Badge>
            {result.confidenceIntervals?.iq?.slowne && (
              <div className="mt-3 space-y-1">
                <div className="text-sm text-gray-600">
                  95% PI: {formatConfidenceInterval(
                    result.iq?.slowne!,
                    result.confidenceIntervals.iq.slowne[95]?.lower || 0,
                    result.confidenceIntervals.iq.slowne[95]?.upper || 0
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  85% PI: {formatConfidenceInterval(
                    result.iq?.slowne!,
                    result.confidenceIntervals.iq.slowne[85]?.lower || 0,
                    result.confidenceIntervals.iq.slowne[85]?.upper || 0
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bezsłowny IQ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-green-700">Bezsłowny IQ (PIQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{result.iq?.bezslowne || "—"}</div>
            <Badge className={getIQInterpretation(result.iq?.bezslowne ?? null).color}>
              {getIQInterpretation(result.iq?.bezslowne ?? null).category}
            </Badge>
            {result.confidenceIntervals?.iq?.bezslowne && (
              <div className="mt-3 space-y-1">
                <div className="text-sm text-gray-600">
                  95% PI: {formatConfidenceInterval(
                    result.iq?.bezslowne!,
                    result.confidenceIntervals.iq.bezslowne[95]?.lower || 0,
                    result.confidenceIntervals.iq.bezslowne[95]?.upper || 0
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  85% PI: {formatConfidenceInterval(
                    result.iq?.bezslowne!,
                    result.confidenceIntervals.iq.bezslowne[85]?.lower || 0,
                    result.confidenceIntervals.iq.bezslowne[85]?.upper || 0
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pełny IQ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-purple-700">Pełny IQ (TIQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{result.iq?.pelne || "—"}</div>
            <Badge className={getIQInterpretation(result.iq?.pelne ?? null).color}>
              {getIQInterpretation(result.iq?.pelne ?? null).category}
            </Badge>
            {result.confidenceIntervals?.iq?.pelne && (
              <div className="mt-3 space-y-1">
                <div className="text-sm text-gray-600">
                  95% PI: {formatConfidenceInterval(
                    result.iq?.pelne!,
                    result.confidenceIntervals.iq.pelne[95]?.lower || 0,
                    result.confidenceIntervals.iq.pelne[95]?.upper || 0
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  85% PI: {formatConfidenceInterval(
                    result.iq?.pelne!,
                    result.confidenceIntervals.iq.pelne[85]?.lower || 0,
                    result.confidenceIntervals.iq.pelne[85]?.upper || 0
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Tabela szczegółowych wyników podskal
  const renderSubtestResults = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Szczegółowe wyniki podskal</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Podtest</TableHead>
              <TableHead className="text-center">WS</TableHead>
              <TableHead className="text-center">WP</TableHead>
              <TableHead className="text-center">95% PI</TableHead>
              <TableHead className="text-center">85% PI</TableHead>
              <TableHead className="text-center">Interpretacja</TableHead>
              <TableHead className="text-center">Percentyl</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ALL_SUBTESTS.map((subtest) => {
              const subtestResult = result.bySubtest[subtest]
              const interpretation = getWPInterpretation(subtestResult?.wp || null)
              const ws = rawScores[subtest] || "—"
              
              return (
                <TableRow key={subtest}>
                  <TableCell className="font-medium">
                    {subtest}
                    {SUBTESTS_SLOWNE.includes(subtest) && (
                      <span className="text-blue-600 text-xs ml-2">[S]</span>
                    )}
                    {SUBTESTS_BEZSLOWNE.includes(subtest) && (
                      <span className="text-green-600 text-xs ml-2">[B]</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{ws}</TableCell>
                  <TableCell className="text-center">
                    {subtestResult?.wp ? (
                      <span className={`font-semibold ${interpretation.color}`}>
                        {subtestResult.wp}
                      </span>
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {subtestResult?.confidence?.[95] ? formatConfidenceInterval(
                      subtestResult.wp!,
                      subtestResult.confidence[95].lower,
                      subtestResult.confidence[95].upper
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {subtestResult?.confidence?.[85] ? formatConfidenceInterval(
                      subtestResult.wp!,
                      subtestResult.confidence[85].lower,
                      subtestResult.confidence[85].upper
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={interpretation.color}>
                      {interpretation.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600">
                    {interpretation.percentile}%
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  // Analiza różnic między skalami
  const renderDifferencesAnalysis = () => {
    const viq = result.iq?.slowne
    const piq = result.iq?.bezslowne
    
    if (!viq || !piq) return null
    
    const viqPiqDifference = Math.abs(viq - piq)
    const isDifferenceSignificant = viqPiqDifference >= 12 // próg istotności dla WAIS-R
    
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analiza różnic między skalami</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Różnica VIQ - PIQ:</span>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">{viqPiqDifference} pkt</span>
                <Badge variant={isDifferenceSignificant ? "destructive" : "secondary"}>
                  {isDifferenceSignificant ? "Istotna statystycznie" : "Nieistotna"}
                </Badge>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {isDifferenceSignificant ? (
                <p className="text-orange-700">
                  ⚠️ Różnica między skalą słowną a bezsłowną jest istotna statystycznie (≥12 pkt). 
                  Wskazuje to na znaczące zróżnicowanie w profilu zdolności poznawczych.
                </p>
              ) : (
                <p className="text-green-700">
                  ✅ Różnica między skalą słowną a bezsłowną nie jest istotna statystycznie (&lt;12 pkt). 
                  Profil zdolności jest względnie wyrównany.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Podsumowanie sum WP
  const renderScaleSums = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-blue-700">Suma WP - Skala słowna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-center">{result.sums.slowna || "—"}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-green-700">Suma WP - Skala bezsłowna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-center">{result.sums.bezslowna || "—"}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-purple-700">Suma WP - Skala pełna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-center">{result.sums.pelna || "—"}</div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Nagłówek z przyciskami */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Wyniki WAIS-R</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onEdit}>
            Edytuj dane
          </Button>
          <Button onClick={onSaveReport}>
            Zapisz raport
          </Button>
        </div>
      </div>

      {/* Główne wyniki IQ */}
      {renderIQResults()}

      {/* Sumy WP */}
      {renderScaleSums()}

      {/* Analiza różnic */}
      {renderDifferencesAnalysis()}

      {/* Szczegółowe wyniki */}
      {renderSubtestResults()}

      {/* Informacje o badaniu */}
      <Card>
        <CardHeader>
          <CardTitle>Informacje o badaniu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Wiek:</span>
              <p className="font-medium">{result.age} lat</p>
            </div>
            <div>
              <span className="text-gray-600">Grupa norm:</span>
              <p className="font-medium">{result.ageGroup}</p>
            </div>
            <div>
              <span className="text-gray-600">Płeć:</span>
              <p className="font-medium">{result.gender === 'M' ? 'Mężczyzna' : 'Kobieta'}</p>
            </div>
            <div>
              <span className="text-gray-600">Narzędzie:</span>
              <p className="font-medium">WAIS-R(PL)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}