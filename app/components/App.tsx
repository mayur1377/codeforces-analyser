"use client";

import React, { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/UsernameContext";
import { useTheme } from "next-themes"; // Assuming you are using next-themes for theme management
import { Skeleton } from "@/components/ui/skeleton"; // Importing the Skeleton component

const App = () => {
  const { username, userphoto } = useContext(UsernameContext); // Assuming userPhoto is part of the context
  const { theme } = useTheme(); // Get the current theme

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading behavior if needed (or replace this with actual data loading logic)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  // Apply theme dynamically using class on the root or body element
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <div
      style={{
        width: "80%",
        height: "70%",
        borderRadius: "80px",
        border: "1px solid #ccc",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "var(--bg-color)", // Use CSS variable for background
        color: "var(--text-color)", // Use CSS variable for text color
        boxShadow: "var(--box-shadow)", // Use CSS variable for shadow
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        id="app-container"
        style={{
          width: "100%",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "80px",
        }}
      >
        {/* Show Skeleton loader if username is loading */}
        {isLoading ? (
          <>
            <Skeleton className="w-[200px] h-[200px] rounded-full" />
          </>
        ) : username ? (
          <>
            {/* Display username and photo once set */}
            <div style={{ marginBottom: "10px" }}>
              <img
                src={userphoto}
                alt="User Photo"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <p>{username}</p>
          </>
        ) : (
            <Skeleton className="w-[200px] h-[200px] rounded-full" />
        )}
      </div>
    </div>
  );
};

export default App;
