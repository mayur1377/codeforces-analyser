import { useTheme } from "next-themes"; // Assuming you're using next-themes for theme management
import React, { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { UsernameContext } from "../context/UsernameContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { setUsername , setUserphoto} = useContext(UsernameContext);
  const { toast } = useToast();
  const { theme } = useTheme(); // Get the current theme

  // Apply the theme class to the body element dynamically
  React.useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = async () => {
    if (query === "") {
      toast({
        title: "bruh moment",
        description: "enter a username!",
      });
      return;
    }

    try {
      const userInfoResponse = await axios.get(
        `https://codeforces.com/api/user.info?handles=${query}`
      );

      if (
        userInfoResponse.data.status === "FAILED" ||
        userInfoResponse.data.result.length === 0 ||
        userInfoResponse.data.result[0].rank === undefined
      ) {
        toast({
          title: "Error",
          description: "Username not found. Please try again.",
          variant: "destructive",
        });
      } else {
        setUserphoto(userInfoResponse.data.result[0].titlePhoto);
        console.log("user photo", userInfoResponse.data.result[0].titlePhoto);
        setUsername(query);
      }
    } catch (error) {
      toast({
        title: "uh huh",
        description: "you sure that person exists??",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
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
        backgroundColor: "var(--bg-color)", // Use CSS variable for background
        boxShadow: "var(--box-shadow)", // Use CSS variable for shadow
      }}
    >
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: "15px",
          border: "none",
          outline: "none",
          borderRadius: "30px",
          backgroundColor: "var(--input-bg)", // Use CSS variable for input background
          color: "var(--text-color)", // Use CSS variable for text color
        }}
        placeholder="Search..."
      />
      <button
        onClick={handleButtonClick}
        style={{
          padding: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          borderRadius: "0 8px 8px 0",
          color: "var(--text-color)", // Use CSS variable for text/icon color
        }}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
