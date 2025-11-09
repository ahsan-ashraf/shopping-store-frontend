import React from "react";
import { Paper, Typography, Box, Grid, IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import type { UserProfile } from "../../../types";

interface Props {
  profile: UserProfile;
  onEdit: () => void;
}

const PersonalInfoSection: React.FC<Props> = ({ profile, onEdit }) => {
  const theme = useTheme();

  const roleLabelMap: Record<string, string> = {
    superAdmin: "Super Admin",
    admin: "Admin",
    seller: "Seller",
    buyer: "Buyer",
    rider: "Rider",
  };

  const roleLabel = profile.role
    ? roleLabelMap[profile.role] || profile.role
    : "-";

  const gridItemStyle = {
    width: "100%",
    "@media(min-width:900px)": { width: "48%" }, // md breakpoint
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Personal Information</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={roleLabel}
            color="primary"
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
          <IconButton onClick={onEdit} aria-label="edit-profile">
            <EditIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Box>
      </Box>

      <Grid container sx={{ gap: 2 }}>
        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Name</Typography>
          <Typography variant="body1">{profile.name || "-"}</Typography>
        </Grid>

        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Email</Typography>
          <Typography variant="body1">{profile.email || "-"}</Typography>
        </Grid>

        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Phone</Typography>
          <Typography variant="body1">{profile.phone || "-"}</Typography>
        </Grid>

        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Birth Date</Typography>
          <Typography variant="body1">
            {profile.birthDate
              ? new Date(profile.birthDate).toLocaleDateString()
              : "-"}
          </Typography>
        </Grid>

        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Address</Typography>
          <Typography variant="body1">{profile.address || "-"}</Typography>
        </Grid>

        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Gender</Typography>
          <Typography variant="body1">{profile.gender || "-"}</Typography>
        </Grid>

        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Vehicle Registration No</Typography>
          <Typography variant="body1">{profile.vehicleRegNo || "-"}</Typography>
        </Grid>

        <Grid sx={gridItemStyle}>
          <Typography variant="subtitle2">Company's Phone</Typography>
          <Typography variant="body1">{profile.companyPhone || "-"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalInfoSection;
