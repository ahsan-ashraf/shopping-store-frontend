import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        color: "text.secondary",
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        pl: { xs: 8, sm: 8, md: 30 }, // aligns beside sidebar
        pr: 2,
        pt: 6,
        pb: 2,
      }}
    >
      {/* ---- Footer Content ---- */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
        }}
      >
        {/* Column 1 - About */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "primary.main" }}
          >
            About
          </Typography>
          <Typography variant="body2">
            We provide innovative solutions and services to make your digital
            experience simple, fast, and reliable.
          </Typography>
        </Box>

        {/* Column 2 - Quick Links */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "primary.main" }}
          >
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Link href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Link href="/about" underline="hover" color="inherit">
              About Us
            </Link>
            <Link href="/contact" underline="hover" color="inherit">
              Contact
            </Link>
            <Link href="/faq" underline="hover" color="inherit">
              FAQ
            </Link>
          </Stack>
        </Box>

        {/* Column 3 - Support */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "primary.main" }}
          >
            Support
          </Typography>
          <Stack spacing={1}>
            <Link href="/help" underline="hover" color="inherit">
              Help Center
            </Link>
            <Link href="/privacy" underline="hover" color="inherit">
              Privacy Policy
            </Link>
            <Link href="/terms" underline="hover" color="inherit">
              Terms of Service
            </Link>
          </Stack>
        </Box>

        {/* Column 4 - Resources */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "primary.main" }}
          >
            Resources
          </Typography>
          <Stack spacing={1}>
            <Link href="/blog" underline="hover" color="inherit">
              Blog
            </Link>
            <Link href="/developers" underline="hover" color="inherit">
              Developers
            </Link>
            <Link href="/careers" underline="hover" color="inherit">
              Careers
            </Link>
          </Stack>
        </Box>

        {/* Column 5 - Social */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "primary.main" }}
          >
            Social
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              color="inherit"
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              color="inherit"
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              color="inherit"
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              color="inherit"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://youtube.com"
              target="_blank"
              color="inherit"
            >
              <YouTube />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* ---- Divider ---- */}
      <Divider sx={{ my: 3 }} />

      {/* ---- Copyright ---- */}
      <Typography variant="body2" align="center" sx={{ pb: 1 }}>
        © {new Date().getFullYear()} MyCompany. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
