"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { IoSunnyOutline } from "react-icons/io5"  // Sun icon
import { LuMoonStar } from "react-icons/lu"     // Moon icon

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleChange = () => {
    setTheme(theme === "dark" ? "light" : "dark")
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
    <div className="fixed bottom-4 left-4 flex items-center space-x-4">
      <button 
        onClick={handleChange} 
        className="text-lg focus:outline-none"
      >
        {theme === "dark" ? (
          <LuMoonStar />  // Moon icon for light theme
        ) : (
          <IoSunnyOutline className="text-black" style={{ color: '#1a202c' }} />
        )}
      </button>
    </div>
  )
}