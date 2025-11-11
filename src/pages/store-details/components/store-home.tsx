import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import { Edit, Facebook, Instagram, YouTube } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/routes-metadata";
import type { Store } from "../../../types";
import { useTheme } from "@mui/material/styles";

interface Props {
  storeData: Store;
}

const StoreHome: React.FC<Props> = ({ storeData }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleConfirmDelete = (): void => {
    // Open confirmation panel
    // Call API to delete store
    // Redirect to appropriate page after deletion
  };
  const handleEditStore = () => navigate(AppRoutes.RegisterStore);
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        {/* Banner */}
        <Box
          component="img"
          src={storeData.banner}
          alt="Store Banner"
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderRadius: 2,
            mb: 2,
          }}
        />

        {/* Info Row */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
          {/* Icon */}
          <Avatar
            src={storeData.icon}
            alt="Store Icon"
            sx={{ width: 120, height: 120, borderRadius: 2 }}
          />

          {/* Info */}
          <Box sx={{ flex: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" fontWeight={600}>
                {storeData.name}
              </Typography>

              <IconButton color="primary" onClick={handleEditStore}>
                <Edit />
              </IconButton>
            </Stack>

            <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
              {storeData.bio}
            </Typography>

            <Stack direction="row" spacing={3} sx={{ mt: 1, flexWrap: "wrap" }}>
              <Typography variant="body2">
                <strong>Category:</strong> {storeData.category}
              </Typography>
              <Typography variant="body2">
                <strong>Brand:</strong> {storeData.brand}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <IconButton
                component="a"
                href={storeData.socials.facebook}
                target="_blank"
                sx={{ color: theme.palette.primary.main }}
              >
                <Facebook />
              </IconButton>

              <IconButton
                component="a"
                href={storeData.socials.instagram}
                target="_blank"
                sx={{ color: theme.palette.primary.main }}
              >
                <Instagram />
              </IconButton>

              <IconButton
                component="a"
                href={storeData.socials.youtube}
                target="_blank"
                sx={{ color: theme.palette.primary.main }}
              >
                <YouTube />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StoreHome;
