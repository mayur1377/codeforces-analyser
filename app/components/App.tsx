"use client";

import React, { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/UsernameContext";
import { useTheme } from "next-themes"; // Assuming you are using next-themes for theme management
import { Skeleton } from "@/components/ui/skeleton"; // Ensure correct import
import ProblemCalendar from "./ProblemCalendar";
import { FaCode } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";
import ContestData from "./ContestData";
import SkeletonLoader from "./SkeletonLoader";
import InitialScreen from "./InitialScreen"; // Import the new component
import UserProfile from "./UserProfile"; // Import the new component
import UserContestData from "./UserContestData"


const App = () => {
  const {
    username,
    userphoto,
    firstName,
    isLoading,
    setIsLoading,
    contribution,
    friendOfCount,
    maxRank,
    maxRating,
    rating,
    rank,
    registrationTime,
    totalSubmissions,
    showContestData,
    // @ts-ignore
    showUserContestData,
  } = useContext(UsernameContext); // Assuming userPhoto is part of the context
  const { theme } = useTheme(); // Get the current theme
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme dynamically using class on the root or body element
  useEffect(() => {
    if (mounted) {
      if (theme === "dark") {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
      } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
      }
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null; // Return nothing until mounted on the client
  }

  return (
    <div className="flex">
      <div className="overflow-y-auto hidden-scrollbar">
        <div 
          className={`
            w-11/12 max-w-3xl rounded-2xl border border-gray-300 p-4 
            flex items-start fixed left-1/2 transform -translate-x-1/2 
            bg-[var(--bg-color)] transition-all duration-500 ease-in-out
            shadow-[0px_10px_14px_rgba(0,0,0,0.1),0px_10px_20px_rgba(0,0,0,0.1)] 
            overflow-hidden
          `}
        >
          <div
            id="app-container"
            className="w-full p-4 flex flex-col rounded-[80px]"
          >
            <div 
              className="transition-all duration-500 ease-in-out overflow-y-auto hidden-scrollbar" 
              style={{ 
                maxHeight: '80vh',
                minHeight: isLoading ? '40vh' : 'auto'
              }}
            >
              {isLoading ? (
                username !== "" ? (
                  <SkeletonLoader />
                ) : (
                  <InitialScreen />
                )
              ) : (
                <div className={`transition-opacity duration-500 ease-in-out ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}>
                  {username ? (
                    <>
                      <UserProfile />
                      <div className="transition-all duration-500 ease-in-out">
                        <ProblemCalendar />
                        <div className="transition-[max-height] duration-500 ease-in-out" 
                             style={{ maxHeight: showUserContestData ? '1000px' : '0', overflow: 'hidden' }}>
                          <div className={`transition-opacity duration-500 ease-in-out ${!showUserContestData ? 'opacity-0' : 'opacity-100'}`}>
                            <UserContestData />
                          </div>
                        </div>
                        <div className="transition-[max-height] duration-500 ease-in-out" 
                             style={{ maxHeight: showContestData ? '1000px' : '0', overflow: 'hidden' }}>
                          <div className={`transition-opacity duration-500 ease-in-out ${!showContestData ? 'opacity-0' : 'opacity-100'}`}>
                            <ContestData />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <InitialScreen />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default App;
