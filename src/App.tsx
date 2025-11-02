import "./App.css";
import ThemeContextProvider from "./context/theme-context";
import AppRouter from "./routes/app-router";

function App() {
  return (
    <ThemeContextProvider>
      <AppRouter />
    </ThemeContextProvider>
  );
}

export default App;
