import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "./App.css";
import ThemeContextProvider from "./context/theme-context";
import AppRouter from "./routes/app-router";
import AuthProvider from "./providers/auth-provider";

function App() {
  return (
    <ThemeContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </LocalizationProvider>
    </ThemeContextProvider>
  );
}

export default App;
