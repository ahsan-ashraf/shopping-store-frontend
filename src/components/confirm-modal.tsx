import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import AppButton, { type AppButtonVariant } from "./ui/app-button";
import { useTheme } from "@mui/material/styles";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  cancelButtonVariant?: AppButtonVariant;
  confirmButtonVariant?: AppButtonVariant;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Please confirm",
  description = "Are you sure?",
  cancelText = "Cancel",
  confirmText = "Delete",
  cancelButtonVariant,
  confirmButtonVariant,
  onCancel,
  onConfirm,
}) => {
  const theme = useTheme();
  return (
    <Modal open={open} onClose={onCancel}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 1,
          border: `1px solid ${theme.palette.primary.main}`,
          p: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <AppButton
            onClick={onCancel}
            variant={
              cancelButtonVariant === null ? "secondary" : cancelButtonVariant
            }
          >
            {cancelText}
          </AppButton>
          <AppButton
            onClick={onConfirm}
            variant={
              confirmButtonVariant === null ? "primary" : confirmButtonVariant
            }
          >
            {confirmText}
          </AppButton>
        </Box>
      </Box>
    </Modal>
  );
};
