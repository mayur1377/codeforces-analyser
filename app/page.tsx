"use client";

import React, { useContext, useState, useEffect } from "react";
import App from "./components/App"; // Adjust the path
import SearchBar from "./components/SearchBar"; // Adjust the path
import { UsernameProvider, UsernameContext } from "./context/UsernameContext"; // Adjust the path
import { ModeToggle } from "./components/theme";
import Sidebar from "./components/Sidebar";
import Confetti from "react-confetti";
import { rankColors } from "./constants"; // Import rank colors

const Home = () => {
  const { rank } = useContext(UsernameContext); // Access the rank
  const [backgroundColor, setBackgroundColor] = useState(rankColors["default"]); // Default color
  const [showConfetti, setShowConfetti] = useState(false);

  // Update background color when rank changes
  useEffect(() => {
    const newColor = rankColors[rank?.toLowerCase()] || rankColors["default"];
    setBackgroundColor(newColor);
    if (rank?.toLowerCase() === "legendary grandmaster" || rank?.toLowerCase() === "tourist") {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [rank]);

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundColor,
        transition: "background-color 2s ease", 
      }}
    >
      {showConfetti && <Confetti tweenDuration={3000} recycle	={false}/>}
      <App />
      <SearchBar />
      <Sidebar />
    </div>
  );
};


export default function HomeWrapper() {
  return (
    <UsernameProvider>
      <Home />
    </UsernameProvider>
  );
}
