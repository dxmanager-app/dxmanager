// src/components/MainSidebar.tsx
import {
  ClipboardEdit,
  BarChartBig,
  ChevronLeft,
  Moon,
  Settings,
  Sun,
  UserCircle2,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MainSidebar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [collapsed, setCollapsed] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const defaultTheme = saved || "dark"
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(defaultTheme)
    localStorage.setItem("theme", defaultTheme)
    setTheme(defaultTheme)
  }, [])

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme") === "system") {
        const systemTheme = e.matches ? "dark" : "light"
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(systemTheme)
        setTheme(systemTheme)
      }
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [])

  const changeTheme = (value: "light" | "dark" | "system") => {
    const resolved =
      value === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value

    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(resolved)
    localStorage.setItem("theme", value)
    setTheme(resolved)
  }

  const navItems = [
    {
      icon: <UserCircle2 className="h-6 w-6" />, to: "/account", label: "Mój profil", disabled: true,
    },
    {
      icon: <ClipboardEdit className="h-6 w-6" />, label: "Nowe badanie", submenu: [
        { to: "/tests/mmpi2", label: "MMPI-2" },
      ],
    },
    {
      icon: <BarChartBig className="h-6 w-6" />, to: "/results", label: "Zapisane wyniki",
    },
  ]

  return (
    <TooltipProvider>
      <aside
        ref={sidebarRef}
        className={cn(
          "h-screen bg-neutral-900 text-white border-r border-border flex flex-col justify-between py-4 px-2 shadow-md shrink-0 top-0 transition-all duration-200",
          collapsed ? "w-[64px]" : "w-56"
        )}
      >
        <div className="relative h-full">
          <div className="flex items-center justify-between px-2 mb-4">
            <span className="text-xl font-semibold tracking-tight">
              {collapsed ? "Dx" : "DxManager"}
            </span>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded focus:outline-none"
              aria-label="Przełącz menu"
            >
              <ChevronLeft
                size={18}
                className={cn(
                  "transition-transform text-muted-foreground",
                  collapsed ? "rotate-180" : "rotate-0"
                )}
              />
            </button>
          </div>

          {navItems.map(({ icon, to, label, submenu, disabled }) => (
            <Tooltip key={label} delayDuration={500}>
              <TooltipTrigger asChild>
                {submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium w-full justify-start",
                          disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {icon}
                        {!collapsed && <span className="truncate">{label}</span>}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right">
                      {submenu.map((item) => (
                        <DropdownMenuItem key={item.label} asChild>
                          <Link to={item.to}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={disabled ? "#" : to}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {icon}
                    {!collapsed && <span className="truncate">{label}</span>}
                  </Link>
                )}
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
            </Tooltip>
          ))}
        </div>

        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-sm font-medium"
              >
                <Settings className="mr-2 h-5 w-5" />
                {!collapsed && <span className="truncate">Ustawienia</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {theme === "light" ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  Tryb motywu
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => changeTheme("light")}>Jasny</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeTheme("dark")}>Ciemny</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeTheme("system")}>Systemowy</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </TooltipProvider>
  )
}  
