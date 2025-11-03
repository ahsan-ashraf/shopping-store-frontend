import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {action && (
        <Button
          variant="text"
          onClick={action.onClick}
          sx={{ textTransform: "none" }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
};

export default SectionHeader;
