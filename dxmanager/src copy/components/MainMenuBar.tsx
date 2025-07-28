import {
  ListChecks,
  PanelLeftClose,
  PanelLeftOpen,
  TestTube2,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function MainMenuBar() {
  const [collapsed, setCollapsed] = useState(false)
  const [testsOpen, setTestsOpen] = useState(true)

  const menuItems = [
    {
      label: "Przeprowadzone testy",
      icon: ListChecks,
      to: "/results",
    },
  ]

  const testItems = [
    {
      label: "MMPI-2",
      icon: TestTube2,
      to: "/tests/mmpi2",
    },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-brand-bg text-brand-fg flex flex-col border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between p-2">
        {!collapsed && <span className="text-lg font-semibold">DxManager</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-muted rounded"
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      <nav className="flex-1">
        <ul className="px-2 space-y-1">
          {menuItems.map(({ label, icon: Icon, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </Link>
            </li>
          ))}

          <li>
            <button
              className="flex items-center w-full gap-3 px-3 py-2 text-left text-sm hover:bg-muted hover:text-foreground rounded transition-colors"
              onClick={() => setTestsOpen(!testsOpen)}
            >
              <TestTube2 size={20} />
              {!collapsed && <span>Testy</span>}
            </button>
            {testsOpen && (
              <ul className="ml-4 mt-1 space-y-1">
                {testItems.map(({ label, icon: Icon, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="flex items-center gap-3 px-3 py-1 rounded text-sm hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Icon size={18} />
                      {!collapsed && <span>{label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}
