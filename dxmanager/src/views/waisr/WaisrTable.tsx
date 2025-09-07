// app/dxmanager/src/views/waisr/WaisrTable.tsx
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ALL_SUBTESTS } from "@/logic/waisr/calculate"
import type { CalculatedResult } from "@/logic/waisr/types"

type Props = {
  rawScores: Record<string, string>
  result: CalculatedResult | null
  onChange: (subtest: string, value: string) => void
}

export default function WaisrTable({ rawScores, result, onChange }: Props) {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[280px]">Podtest</TableHead>
            <TableHead className="text-center">Wynik surowy (WS)</TableHead>
            <TableHead className="text-center">Wynik przeliczony (WP)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ALL_SUBTESTS.map((s) => (
            <TableRow key={s}>
              <TableCell className="font-medium">{s}</TableCell>
              <TableCell className="text-center">
                <Input
                  type="number"
                  value={rawScores[s] ?? ""}
                  onChange={(e) => onChange(s, e.target.value)}
                  className="w-24 text-center"
                />
              </TableCell>
              <TableCell className="text-center">
                {result?.bySubtest[s]?.wp ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
