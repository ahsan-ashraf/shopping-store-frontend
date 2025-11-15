import React from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";

const FallbackLoader: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress size={50} />
        <Typography variant="h6" color="text.secondary">
          Loading, please wait...
        </Typography>
      </Stack>
    </Box>
  );
};

export default FallbackLoader;
