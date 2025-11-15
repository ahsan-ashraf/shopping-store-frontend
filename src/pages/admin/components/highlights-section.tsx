import React from "react";
import { Box, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ErrorIcon from "@mui/icons-material/Error";

// Type for highlight items
export interface HighlightItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

// Sample data for highlights
export const SAMPLE_HIGHLIGHTS: HighlightItem[] = [
  {
    label: "Total Orders",
    value: 1520,
    icon: <ShoppingBagIcon color="primary" />,
  },
  { label: "Total Stores", value: 250, icon: <StoreIcon color="primary" /> },
  { label: "Total Buyers", value: 4200, icon: <PeopleIcon color="primary" /> },
  {
    label: "Total Riders",
    value: 120,
    icon: <LocalShippingIcon color="primary" />,
  },
  { label: "Total Canceled", value: 80, icon: <CancelIcon color="error" /> },
  {
    label: "Total Returns",
    value: 45,
    icon: <AssignmentReturnIcon color="error" />,
  },
  { label: "Total Failed", value: 20, icon: <ErrorIcon color="error" /> },
  { label: "Average Rating", value: 4.5, icon: <StarIcon color="primary" /> },
  {
    label: "Revenue",
    value: "$45,000",
    icon: <MonetizationOnIcon color="success" />,
  },
];

interface HighlightsSectionProps {
  highlights?: HighlightItem[];
}

const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  highlights = SAMPLE_HIGHLIGHTS,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Dashboard Highlights
      </Typography>

      <Grid container spacing={2} mb={3} sx={{ justifyContent: "center" }}>
        {highlights.map((item) => (
          <Grid sx={{ xs: 6, sm: 4, md: 2 }} key={item.label}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                boxShadow: 3,
                cursor: "pointer",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  transform: "translateY(-3px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Stack spacing={1} alignItems="center">
                {item.icon}
                <Typography variant="subtitle2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h6">{item.value}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HighlightsSection;
