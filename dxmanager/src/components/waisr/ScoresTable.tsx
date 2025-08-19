// app/dxmanager/src/components/waisr/ScoresTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ALL_SUBTESTS, SUBTESTS_BEZSLOWNE, SUBTESTS_SLOWNE } from "@/logic/waisr/calculate"
import type { CalculatedResult } from "@/logic/waisr/types"

export function ScoresTable({ result }: { result: CalculatedResult }) {
  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Podtest</TableHead>
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

        <TableRow>
          <TableCell className="font-medium">Suma słowna</TableCell>
          <TableCell />
          <TableCell>{result.sums.slowna ?? ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Suma bezsłowna</TableCell>
          <TableCell />
          <TableCell>{result.sums.bezslowna ?? ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Suma pełna</TableCell>
          <TableCell />
          <TableCell>{result.sums.pelna ?? ""}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
