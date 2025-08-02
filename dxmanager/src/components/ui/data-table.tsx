import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="rounded-md border overflow-hidden">
      <table className="w-full text-sm">
        {/* Nagłówki */}
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                const sortIcon =
                  sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : ""

                return (
                  <th
                    key={header.id}
                    className={cn(
                      "px-3 py-2 text-left font-semibold select-none cursor-pointer",
                      header.column.getCanSort() && "hover:bg-muted/50"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      sorted === "asc"
                        ? "Sortowanie rosnąco"
                        : sorted === "desc"
                        ? "Sortowanie malejąco"
                        : "Sortowanie domyślne"
                    }
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="text-xs">{sortIcon}</span>
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>

        {/* Wiersze */}
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-muted/30 border-b last:border-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-4 text-center text-muted-foreground"
              >
                Brak danych do wyświetlenia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
