// app/dxmanager/src/components/waisr/ScoresTable.tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { ALL_SUBTESTS } from "@/logic/waisr/calculate"
import type { CalculatedResult } from "@/logic/waisr/types"

export function ScoresTable({ result }: { result: CalculatedResult }) {
  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow>
          <TableHead>Podtest</TableHead>
          <TableHead>WS</TableHead>
          <TableHead>WP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ALL_SUBTESTS.map((subtest) => {
          const s = result.bySubtest[subtest]
          return (
            <TableRow key={subtest}>
              <TableCell>{subtest}</TableCell>
              <TableCell>{s?.ws ?? ""}</TableCell>
              <TableCell>{s?.wp ?? ""}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ScoresTable
