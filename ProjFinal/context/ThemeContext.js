import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const defaultPalette = {
  background: "#f0f4f7",
  card: "#fff",
  primary: "#2e7d32",
  text: "#222",
  textSecondary: "#888",
  success: "#388e3c",
  warning: "#fb8c00",
};

const darkPalette = {
  background: "#121212",
  card: "#232323",
  primary: "#90ee90",
  text: "#fff",
  textSecondary: "#bbb",
  success: "#90ee90",
  warning: "#ffb300",
};

export function ThemeProvider({ children }) {
  const [menuDisplay, setMenuDisplay] = useState("icones_texto");
  const [theme, setTheme] = useState("claro"); // "claro", "escuro", "sistema"

  const palette = theme === "escuro" ? darkPalette : defaultPalette;

  return (
    <ThemeContext.Provider
      value={{
        menuDisplay,
        setMenuDisplay,
        palette,
        setTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
