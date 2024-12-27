"use client"

import * as React from "react"
import { ModeToggle } from "./theme"
import { Developer } from "./Developer"

const Sidebar = () => {
  return (
    <div className="fixed bottom-0 left-0 h-full w-16 flex flex-col items-center justify-end text-white p-4">
      <div className="mb-8">
        <ModeToggle />
        <Developer />
      </div>
    </div>
  )
}

export default Sidebar