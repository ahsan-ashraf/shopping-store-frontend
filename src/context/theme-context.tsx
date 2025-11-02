import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  type PaletteMode,
} from "@mui/material";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextType {
  mode: PaletteMode;
  primaryColor: string;
  toggle: () => void;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [primaryColor, setPrimaryColorState] = useState("#f57224");

  const toggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: primaryColor },
          background: {
            default: mode === "light" ? "#fafafa" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
        },
      }),
    [mode, primaryColor]
  );

  return (
    <ThemeContext.Provider
      value={{ mode, toggle, primaryColor, setPrimaryColor }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }
  return context;
};
