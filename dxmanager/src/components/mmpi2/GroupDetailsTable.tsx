// app/dxmanager/src/components/mmpi2/GroupDetailsTable.tsx
import { useState } from "react"
import { scaleLabels } from "@/logic/mmpi2/scaleLabels"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

interface GroupDetailsTableProps {
  rows: string[]
  scores: Record<string, any>
  groupName: string
  visibleColumns: { raw: boolean; k: boolean; t: boolean }
  visibleRows: string[]
}

function SortableRow({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-border last:border-0 hover:bg-accent/40"
    >
      {/* Drag handle */}
      <td
        className="px-2 py-1 font-medium cursor-grab"
        {...attributes}
        {...listeners}
      >
        {id}
      </td>
      {children}
    </tr>
  )
}

export function GroupDetailsTable({
  rows,
  scores,
  groupName,
  visibleColumns,
  visibleRows,
}: GroupDetailsTableProps) {
  const [items, setItems] = useState(rows)
  const isVrinTrinGroup =
    groupName.toLowerCase().includes("vrin") && groupName.toLowerCase().includes("trin")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <table className="w-full text-sm border-collapse">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-2 py-1 w-[60px]">Skrót</th>
            <th className="text-left px-2 py-1">Skala</th>
            {visibleColumns.raw && (
              <th className="text-center px-2 py-1 w-[70px]">WS</th>
            )}
            {visibleColumns.k && (
              <th className="text-center px-2 py-1 w-[70px]">K</th>
            )}
            {visibleColumns.t && (
              <th className="text-center px-2 py-1 w-[70px]">T</th>
            )}
          </tr>
        </thead>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <tbody>
            {items
              .filter((key) => visibleRows.includes(key))
              .map((key) => {
                const s = scores[key] || {}
                return (
                  <SortableRow key={key} id={key}>
                    <td className="px-2 py-1 truncate max-w-[200px]">
                      {scaleLabels[key]?.pl || scaleLabels[key]?.en || key}
                    </td>
                    {visibleColumns.raw && (
                      <td className="text-center">{s.raw ?? "—"}</td>
                    )}
                    {visibleColumns.k && (
                      <td className="text-center">{s.k ?? "—"}</td>
                    )}
                    {visibleColumns.t && (
                      <td className="text-center">
                        {isVrinTrinGroup ? "—" : s.t ?? "—"}
                      </td>
                    )}
                  </SortableRow>
                )
              })}
          </tbody>
        </SortableContext>
      </table>
    </DndContext>
  )
}
