"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  React.useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else {
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }
  }, [theme])

  return (
    <div className="flex items-center space-x-4">
      <Label htmlFor="theme-toggle" className="text-lg">
        Theme
      </Label>
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={handleChange}
      />
    </div>
  )
}
