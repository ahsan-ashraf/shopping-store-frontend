import React from "react";
import { Paper, Typography, Box, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import type { UserProfile } from "../../../types";

interface Props {
  profile: UserProfile;
  onEdit: () => void;
}

const PersonalInfoSection: React.FC<Props> = ({ profile, onEdit }) => {
  const theme = useTheme();
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
        <IconButton onClick={onEdit} aria-label="edit-profile">
          <EditIcon sx={{ color: `${theme.palette.primary.main}` }} />
        </IconButton>
      </Box>

      <Grid container sx={{ gap: 2 }}>
        <Grid sx={{ width: "48%" }}>
          <Typography variant="subtitle2">Name</Typography>
          <Typography variant="body1">{profile.name || "-"}</Typography>
        </Grid>

        <Grid sx={{ width: "48%" }}>
          <Typography variant="subtitle2">Email</Typography>
          <Typography variant="body1">{profile.email || "-"}</Typography>
        </Grid>

        <Grid sx={{ width: "48%" }}>
          <Typography variant="subtitle2">Phone</Typography>
          <Typography variant="body1">{profile.phone || "-"}</Typography>
        </Grid>

        <Grid sx={{ width: "48%" }}>
          <Typography variant="subtitle2">Birth Date</Typography>
          <Typography variant="body1">
            {profile.birthDate
              ? new Date(profile.birthDate).toLocaleDateString()
              : "-"}
          </Typography>
        </Grid>

        <Grid sx={{ width: "48%" }}>
          <Typography variant="subtitle2">Gender</Typography>
          <Typography variant="body1">{profile.gender || "-"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalInfoSection;
