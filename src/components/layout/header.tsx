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
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/theme-context";
import { AppRoutes } from "../../routes/routes-metadata";

const navItems = [
  { label: "Home", path: AppRoutes.Home },
  { label: "About", path: AppRoutes.About },
  { label: "Contact", path: AppRoutes.Contact },
  { label: "Login", path: "/login" },
];

const Header: React.FC = () => {
  const { mode, toggle } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Temporary cart count (you can replace it later with context or Redux)
  const cartCount = 3;

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

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMobile ? (
              <>
                {/* Navigation Links */}
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

                {/* Login Button */}
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{ ml: 1, bgcolor: "#f57224", textTransform: "none" }}
                >
                  Login
                </Button>

                {/* 🔹 Cart Icon with Badge */}
                <IconButton
                  component={Link}
                  to="/cart"
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <Badge
                    badgeContent={cartCount}
                    color="error"
                    overlap="rectangular"
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>

                {/* Theme Toggle */}
                <IconButton color="inherit" onClick={toggle} sx={{ ml: 1 }}>
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </>
            ) : (
              <>
                {/* Mobile Menu Icon */}
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

              {/* 🔹 Cart Button (inside mobile menu) */}
              <Button
                component={Link}
                to="/cart"
                onClick={() => setMenuOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  px: 3,
                  py: 1.5,
                  color: theme.palette.text.primary,
                }}
                startIcon={
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                }
              >
                Cart
              </Button>

              {/* Theme Toggle */}
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
