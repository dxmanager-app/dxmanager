import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  defaultTheme?: "light" | "dark";
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme"
}: Props) {
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as "light" | "dark" | null;
    const theme = savedTheme || defaultTheme;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [defaultTheme, storageKey]);

  return <>{children}</>;
}
