// app/dxmanager/src/components/ui/date-picker.tsx

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format, parse } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

export function DatePicker({
  date,
  setDate,
}: {
  date: Date | null
  setDate: (date: Date | null) => void
}) {
  const [inputValue, setInputValue] = React.useState(date ? format(date, "yyyy-MM-dd") : "")
  const [open, setOpen] = React.useState(false)

  const handleSelect = (selectedDate?: Date) => {
    setOpen(false)
    if (selectedDate) {
      setInputValue(format(selectedDate, "yyyy-MM-dd"))
      setDate(selectedDate)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    const parsed = parse(value, "yyyy-MM-dd", new Date())
    if (!isNaN(parsed.getTime())) {
      setDate(parsed)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span>Wybierz datę</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date ?? undefined} onSelect={handleSelect} initialFocus />
      </PopoverContent>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="yyyy-mm-dd"
        className="mt-2"
      />
    </Popover>
  )
}
