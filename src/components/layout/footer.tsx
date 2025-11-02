import React from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  useTheme,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.background.paper,
        py: 3,
        px: 2,
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        <MuiLink component={Link} to="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink component={Link} to="/about" underline="hover" color="inherit">
          About
        </MuiLink>
        <MuiLink
          component={Link}
          to="/contact"
          underline="hover"
          color="inherit"
        >
          Contact
        </MuiLink>
        <MuiLink component={Link} to="/terms" underline="hover" color="inherit">
          Terms
        </MuiLink>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <IconButton component="a" href="#" color="inherit">
          <Facebook />
        </IconButton>
        <IconButton component="a" href="#" color="inherit">
          <Twitter />
        </IconButton>
        <IconButton component="a" href="#" color="inherit">
          <Instagram />
        </IconButton>
      </Box>

      <Typography
        variant="caption"
        display="block"
        sx={{ width: "100%", textAlign: "center", mt: { xs: 1, sm: 0 } }}
      >
        &copy; {new Date().getFullYear()} Saba Store. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
