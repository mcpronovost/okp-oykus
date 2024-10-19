import { createContext, useState } from "react";
import { setStoreItem, getStoreItem, deleteStoreItem } from "@/_lib/store";

export const okpTheme = {
  colorSchemes: {
    light: {
      palette: {},
    },
    dark: {
      palette: {
        primary: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
      },
    },
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setStateTheme] = useState("default");

  const setTheme = (value) => {
    setStoreItem("theme", value);
    setStateTheme(value);
  };

  return (
    <ThemeContext.Provider value={{
        theme,
        setTheme
      }}>
        {children}
    </ThemeContext.Provider>
  );
};
