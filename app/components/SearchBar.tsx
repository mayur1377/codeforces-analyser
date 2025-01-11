"use client"
import React, { useState, useContext, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UsernameContext } from "../context/UsernameContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes"; 
import { SlCalender } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { TbTable, TbTableOff } from "react-icons/tb";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  // @ts-ignore
  const { setUsername, setUserphoto, setFirstName, setSelectedYears, problemsPerDayMap, selectedYears , isLoading , username, showContestData, setShowContestData, showUserContestData, setShowUserContestData } = useContext(UsernameContext);
  const { toast } = useToast();
  const { theme } = useTheme();
  const [years, setYears] = useState<number[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const uniqueYears = Array.from(problemsPerDayMap.keys()).map(date => new Date(date).getFullYear());
    setYears(Array.from(new Set(uniqueYears)).sort((a, b) => b - a));
  }, [problemsPerDayMap]);

  useEffect(() => {
    if (years.length > 0 && selectedYears.length === 0) {
      setSelectedYears([currentYear]);
    }
  }, [years, selectedYears.length, setSelectedYears, currentYear]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = async () => {
    if (query === "") {
      toast({ title: "Bruh", description: "Enter a username!"});
      return;
    }
    else if (query === username) {
      toast({ title: "Bruh", description: "Already showing data for this user!"});
      return;
    }

    try {
      const userInfoResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${query}`);
      // await axios.post("https://cf-backend-8rqs.onrender.com/api/track-username", { username: query }); // hehe
      if (userInfoResponse.status === 400 || userInfoResponse.data.status === "FAILED" || userInfoResponse.data.result.length === 0) {
        toast({ title: "DUDE", description: "is that your imaginary friend ??", variant: "destructive" });
      } else {
        const userData = userInfoResponse.data.result[0];
        setUserphoto(userData.titlePhoto);
        setUsername(query);
        setFirstName(userData.firstName);
      }
    } catch (error) {
      toast({ title: "DUDE", description: "is that your imaginary friend ??"});
    }
  };

  useEffect(() => {
    if (query !== username) {
      setSelectedYears([currentYear]);
    }
  }, [query, setSelectedYears, currentYear, username]);

  const handleYearChange = (selectedYear: number, checked: boolean) => {
    // fix this later to : to do
    // @ts-ignore 
    setSelectedYears((prevSelectedYears: number[]) => 
      checked
      ? [...prevSelectedYears, selectedYear]
        : prevSelectedYears.filter(year => year !== selectedYear)
    );
  };

  const handleSelectAllYears = (checked: boolean) => {
    setSelectedYears(checked ? years : []);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  const toggleContestData = () => {
    setShowContestData(!showContestData);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "70px",
        borderRadius: "80px",
        border: "1px solid #ccc",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "var(--bg-color)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added box shadow
      }}
    >
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter codeforces handle"
        style={{
          flex: 1,
          padding: "15px",
          border: "none",
          borderRadius: "30px",
          backgroundColor: "var(--input-bg)",
          color: "var(--text-color)",
          outline: "none", // Prevents default focus outline
          boxShadow: "none", // Removes default box-shadow on focus
        }}
      />

      <button
        onClick={handleButtonClick}
        style={{
          padding: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "var(--text-color)",
        }}
      >
        <IoSearch />
      </button>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            style={{ marginLeft: "10px", padding: "8px", border: "none", cursor: "pointer" }}
            disabled={isLoading}
          >
            <SlCalender />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{ padding: "10px", width: "200px" }}>
          {years.map(year => (
            <DropdownMenuItem key={year} onSelect={(e) => e.preventDefault()}>
              <Checkbox
                checked={selectedYears.includes(year)}
                onCheckedChange={(checked) => handleYearChange(year, checked as boolean)}
              />
              <span style={{ marginLeft: "8px" }}>{year}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Checkbox
              checked={selectedYears.length === years.length}
              onCheckedChange={(checked) => handleSelectAllYears(checked as boolean)}
            />
            <span style={{ marginLeft: "8px" }}>Select All Years</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        onClick={toggleContestData}
        style={{
          padding: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "var(--text-color)",
        }}
      >
        {showContestData ? <GoEye /> : <GoEyeClosed />}
      </button>
      <button
        onClick={() => setShowUserContestData(!showUserContestData)}
        style={{
          padding: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "var(--text-color)",
        }}
      >
        {showUserContestData ? <TbTable /> : <TbTableOff />}
      </button>
    </div>
  );
};

export default SearchBar;
