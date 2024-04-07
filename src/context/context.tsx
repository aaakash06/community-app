"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let [mode, setMode] = useState("dark");

  function handleThemeChange() {
    // console.log("mode was changed");
    if (mode == "dark" || ( !("theme" in localStorage) ) && (window. matchMedia('(prefers-color-scheme: dark)').matches)  ) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("error in useTheme function");
  return context;
}

export default useTheme;
