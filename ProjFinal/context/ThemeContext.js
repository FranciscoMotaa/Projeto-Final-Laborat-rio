import React, { createContext, useContext, useState } from "react";

const colorPalettes = {
  padrao: {
    primary: "#2e7d32",
    background: "#fff",
    text: "#222",
    card: "#fff",
  },
  contraste: {
    primary: "#000",
    background: "#fff",
    text: "#000",
    card: "#fff",
  },
  protano: {
    primary: "#0072b2",
    background: "#fff",
    text: "#222",
    card: "#fff",
  },
  deutero: {
    primary: "#009e73",
    background: "#fff",
    text: "#222",
    card: "#fff",
  },
  tritano: {
    primary: "#d55e00",
    background: "#fff",
    text: "#222",
    card: "#fff",
  },
};

const ThemeContext = createContext({
  cor: "padrao",
  setCor: () => {},
  palette: colorPalettes["padrao"],
});

export function ThemeProvider({ children }) {
  const [cor, setCor] = useState("padrao");
  const palette = colorPalettes[cor] || colorPalettes["padrao"];
  return (
    <ThemeContext.Provider value={{ cor, setCor, palette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}