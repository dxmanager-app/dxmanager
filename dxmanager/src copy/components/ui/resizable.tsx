// src/components/ui/resizable.tsx
"use client"

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import { cn } from "@/lib/utils"

const Resizable = PanelGroup

const ResizablePanel = Panel

const ResizableHandle = (props: { className?: string }) => (
  <PanelResizeHandle
    className={cn(
      "w-1 bg-border hover:bg-accent transition-colors cursor-col-resize",
      props.className
    )}
  />
)

export { Resizable, ResizablePanel, ResizableHandle }
