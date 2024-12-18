"use client";

import React from "react";
import App from "./components/App"; // Adjust the path
import SearchBar from "./components/SearchBar"; // Adjust the path
import { UsernameProvider } from "./context/UsernameContext"; // Adjust the path
import { ModeToggle } from "./components/theme";

export default function Home() {
  return (
    <UsernameProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <App />
        <SearchBar />
        <ModeToggle />
      </div>
    </UsernameProvider>
  );
}
