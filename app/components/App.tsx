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
import { motion, AnimatePresence } from "framer-motion"; // Add this import


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

  // Add these animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.15,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Add this function to handle staggered exits
  const getExitDelay = (index: number) => ({
    exit: {
      transition: {
        delay: index * 0.15, // Stagger the exit animations
      },
    },
  });

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
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {username !== "" ? (
                      <SkeletonLoader />
                    ) : (
                      <InitialScreen />
                    )}
                  </motion.div>
                ) : username ? (
                  <motion.div
                    key={`content-${username}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`profile-${username}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        // @ts-ignore
                        exit="exit"
                        custom={0}
                        {...getExitDelay(0)}
                      >
                        <UserProfile />
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`calendar-${username}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        // @ts-ignore
                        exit="exit"
                        custom={1}
                        {...getExitDelay(1)}
                      >
                        <ProblemCalendar />
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`usercontest-${username}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        // @ts-ignore
                        exit="exit"
                        custom={2}
                        {...getExitDelay(2)}
                      >
                        <div className="transition-[max-height] duration-500 ease-in-out" 
                             style={{ maxHeight: showUserContestData ? '1000px' : '0', overflow: 'hidden' }}>
                          <div className={`transition-opacity duration-500 ease-in-out ${!showUserContestData ? 'opacity-0' : 'opacity-100'}`}>
                            <UserContestData />
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`contest-${username}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        // @ts-ignore
                        exit="exit"
                        custom={3}
                        {...getExitDelay(3)}
                      >
                        <div className="transition-[max-height] duration-500 ease-in-out" 
                             style={{ maxHeight: showContestData ? '1000px' : '0', overflow: 'hidden' }}>
                          <div className={`transition-opacity duration-500 ease-in-out ${!showContestData ? 'opacity-0' : 'opacity-100'}`}>
                            <ContestData />
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <InitialScreen />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default App;
