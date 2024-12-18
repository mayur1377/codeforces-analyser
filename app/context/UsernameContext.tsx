"use client";

import React, { createContext, useState } from "react";
import { ReactNode } from "react";

export const UsernameContext = createContext({
  username: "",
  setUsername: (username: string) => {},
  userphoto: "",
  setUserphoto: (userphoto: string) => {},
});

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [userphoto, setUserphoto] = useState("");

  return (
    <UsernameContext.Provider value={{ username, setUsername , userphoto, setUserphoto}}>
      {children}
    </UsernameContext.Provider>
  );
};
