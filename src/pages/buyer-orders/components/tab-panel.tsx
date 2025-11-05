import React from "react";
import type { ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`orders-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
