import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/header";
import Sidebar from "../components/layout/side-bar";
import Footer from "../components/layout/footer";
import { Box } from "@mui/material";

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
