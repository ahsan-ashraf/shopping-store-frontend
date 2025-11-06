import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "./App.css";
import ThemeContextProvider from "./context/theme-context";
import AppRouter from "./routes/app-router";

function App() {
  return (
    <ThemeContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRouter />
      </LocalizationProvider>
    </ThemeContextProvider>
  );
}

export default App;
