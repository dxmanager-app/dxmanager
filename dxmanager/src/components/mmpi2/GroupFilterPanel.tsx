// app/dxmanager/src/components/mmpi2/GroupFilterPanel.tsx

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export type GroupFilterPanelProps = {
  group: string
  allRows: string[]
  onClose: () => void
}

const ALL_COLUMNS = ["WS", "K", "T"]

export function GroupFilterPanel({ allRows, onClose }: GroupFilterPanelProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(ALL_COLUMNS)
  const [selectedRows, setSelectedRows] = useState<string[]>(allRows)

  const toggleColumn = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    )
  }

  const toggleRow = (row: string) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((r) => r !== row) : [...prev, row]
    )
  }

  const handleApply = () => {
    console.log("Zastosowano filtr", { selectedColumns, selectedRows })
    onClose()
  }

  return (
    <div className="p-4 space-y-4 w-72 text-sm">
      <div>
        <h2 className="font-semibold mb-1">Widoczne kolumny</h2>
        <div className="flex gap-2 flex-wrap">
          {ALL_COLUMNS.map((col) => (
            <label key={col} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedColumns.includes(col)}
                onChange={() => toggleColumn(col)}
              />
              {col}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-1">Widoczne wiersze</h2>
        <ScrollArea className="h-48 pr-2 border rounded">
          <div className="space-y-1 p-2">
            {allRows.map((row) => (
              <label key={row} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRow(row)}
                />
                {row}
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Button className="w-full mt-2" onClick={handleApply}>
        Zastosuj
      </Button>
    </div>
  )
}
