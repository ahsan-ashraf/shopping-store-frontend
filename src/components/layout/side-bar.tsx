import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

const drawerWidth = 200;
const miniWidth = 60;

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Orders", path: "/orders", icon: <ListAltIcon /> },
  { label: "Wishlist", path: "/wishlist", icon: <FavoriteIcon /> },
  { label: "Categories", path: "/categories", icon: <CategoryIcon /> },
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "About", path: "/about", icon: <InfoIcon /> },
  { label: "Contact", path: "/contact", icon: <ContactMailIcon /> },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isMobile ? miniWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? miniWidth : drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          bgcolor: theme.palette.background.paper,

          // there is a minor issue while changing the layout at breakpoint,
          // issue is with headerbar height changing and the sidebar overlapping with it.
          top: isMobile ? "56px" : "64px",
          height: `calc(100% - 64px)`,
        },
      }}
    >
      <Divider />
      <List>
        {sidebarItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            to={item.path}
            sx={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-start",
              px: isMobile ? 0 : 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isMobile ? 0 : 2,
                justifyContent: "center",
                color: theme.palette.text.primary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!isMobile && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
