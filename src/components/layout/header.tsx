// src/components/layout/Header.tsx
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/theme-context";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Login", path: "/login" },
];

const Header: React.FC = () => {
  const { mode, toggle } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={1}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Store icon + name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StorefrontIcon sx={{ color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontFamily: "Inter, Roboto, sans-serif",
              }}
            >
              Saba Store
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMobile && (
              <>
                {navItems.slice(0, 3).map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{ textTransform: "none", fontWeight: 500 }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{ ml: 1, bgcolor: "#f57224", textTransform: "none" }}
                >
                  Login
                </Button>
                <IconButton color="inherit" onClick={toggle} sx={{ ml: 1 }}>
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </>
            )}

            {isMobile && (
              <>
                {/* <IconButton color="inherit" onClick={toggle}>
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}
                <IconButton
                  color="inherit"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Collapsible Menu */}
        {isMobile && (
          <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    color: theme.palette.text.primary,
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={toggle}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  px: 3,
                  py: 1.5,
                  color: theme.palette.text.primary,
                }}
              >
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </Box>
          </Collapse>
        )}
      </AppBar>
    </>
  );
};

export default Header;
