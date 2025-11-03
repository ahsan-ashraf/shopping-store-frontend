// src/components/ui/Button.tsx
import React, { forwardRef } from "react";
import MUIButton, {
  type ButtonProps as MUIButtonProps,
} from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

/**
 * AppButtonProps
 * - extends MUI Button props so it's drop-in compatible
 * - removes MUI's 'variant' and replaces with our semantic variants
 */
export type AppButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface AppButtonProps extends Omit<MUIButtonProps, "variant"> {
  variant?: AppButtonVariant;
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
  sx?: SxProps<Theme>;
}

/** style map for semantic variants */
const variantSx = (variant: AppButtonVariant | undefined): SxProps<Theme> => {
  switch (variant) {
    case "secondary":
      return {
        bgcolor: "grey.100",
        color: "text.primary",
        border: (theme: Theme) => `1px solid ${theme.palette.grey[300]}`,
        "&:hover": { bgcolor: "grey.200" },
      };
    case "ghost":
      return {
        bgcolor: "transparent",
        color: "text.primary",
        boxShadow: "none",
        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
      };
    case "danger":
      return {
        bgcolor: "error.main",
        color: "common.white",
        "&:hover": { bgcolor: "error.dark" },
      };
    case "primary":
    default:
      return {
        bgcolor: "primary.main",
        color: "primary.contrastText",
        "&:hover": { bgcolor: "primary.dark" },
      };
  }
};

const baseSx: SxProps<Theme> = {
  textTransform: "none",
  borderRadius: 2,
  px: 2.5,
  py: 1,
  minHeight: 40,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
};

/**
 * AppButton implementation
 */
const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      children,
      variant = "primary",
      loading = false,
      loadingIndicator,
      disabled,
      startIcon,
      endIcon,
      sx,
      ...rest
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled) || Boolean(loading);

    // combine sx pieces into a single SxProps<Theme> so TS is happy
    const combinedSx: SxProps<Theme> = [
      variantSx(variant),
      baseSx,
      sx ?? {},
    ] as SxProps<Theme>;

    return (
      <MUIButton
        // cast 'rest' to MUIButtonProps to satisfy overload typing
        {...(rest as MUIButtonProps)}
        ref={ref}
        disabled={isDisabled}
        sx={combinedSx}
        aria-busy={loading ? true : undefined}
        aria-disabled={isDisabled ? true : undefined}
        startIcon={loading ? undefined : startIcon}
        endIcon={loading ? undefined : endIcon}
      >
        {loading ? (
          <Box
            component="span"
            sx={
              {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              } as SxProps<Theme>
            }
          >
            {loadingIndicator ?? <CircularProgress size={18} thickness={5} />}
            {/* Keep text present for accessibility; visually-hidden can be applied if desired */}
            <Box component="span" sx={{ ml: 0 }}>
              {children}
            </Box>
          </Box>
        ) : (
          children
        )}
      </MUIButton>
    );
  }
);

AppButton.displayName = "AppButton";

export default AppButton;
