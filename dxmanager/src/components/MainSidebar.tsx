import {
  BarChartBig,
  ListTodo,
  Settings,
  UserCircle2,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const menuItems = [
  {
    icon: <BarChartBig className="h-6 w-6" />, // Przyszłe testy
    to: "/tests/mmpi2",
    label: "Testy",
  },
  {
    icon: <ListTodo className="h-6 w-6" />,
    to: "/results",
    label: "Wyniki",
  },
  {
    icon: <UserCircle2 className="h-6 w-6" />,
    to: "/account",
    label: "Konto",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    to: "/settings",
    label: "Ustawienia",
  },
]

export default function SidebarMenu() {
  const location = useLocation()

  return (
    <TooltipProvider>
      <aside className="h-screen w-16 lg:w-56 bg-muted text-muted-foreground border-r border-border flex flex-col items-center lg:items-start py-4 px-2 space-y-4 shadow-md">
        <Link to="/" className="mb-6">
          <div className="text-xl font-semibold tracking-tight text-primary px-2">DxManager</div>
        </Link>

        {menuItems.map(({ icon, to, label }) => {
          const isActive = location.pathname.startsWith(to)

          return (
            <Tooltip key={label} delayDuration={500}>
              <TooltipTrigger asChild>
                <Link
                  to={to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  {icon}
                  <span className="hidden lg:inline-block truncate">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="lg:hidden">
                {label}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </aside>
    </TooltipProvider>
  )
}
