import React, { useState, type KeyboardEvent } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import AppInput from "./app-input";
import AppButton from "./app-button";

export interface AppSearchBarProps {
  label?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  loading?: boolean;
  buttonText?: string;
  fullWidth?: boolean;
}

const AppSearchBar: React.FC<AppSearchBarProps> = ({
  label = "Search",
  placeholder = "Search products...",
  onSearch,
  loading = false,
  buttonText = "Search",
  fullWidth = true,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: fullWidth ? "100%" : "auto",
      }}
    >
      <AppInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label={label}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        startIcon={<SearchIcon color="action" />}
        fullWidth
      />

      <AppButton
        onClick={handleSearch}
        disabled={loading}
        startIcon={
          loading ? <CircularProgress size={18} color="inherit" /> : undefined
        }
      >
        {buttonText}
      </AppButton>
    </Box>
  );
};

export default AppSearchBar;
