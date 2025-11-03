import React, { forwardRef } from "react";
import { TextField, InputAdornment, type TextFieldProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export interface AppInputProps extends Omit<TextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  rounded?: boolean;
  sx?: SxProps<Theme>;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      variant = "outlined",
      size = "medium",
      startIcon,
      endIcon,
      rounded = true,
      sx,
      InputProps,
      ...rest
    },
    ref
  ) => {
    return (
      <TextField
        {...rest}
        inputRef={ref}
        fullWidth={rest.fullWidth ?? true}
        variant={variant}
        size={size}
        InputProps={{
          ...InputProps,
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
        }}
        sx={[
          {
            "& .MuiOutlinedInput-root": {
              borderRadius: rounded ? 2 : 1,
              "&.Mui-focused fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
            "& .MuiInputBase-input": {
              // reset any manual vertical padding to keep placeholder centered
              lineHeight: 1.5,
            },
            "& .MuiInputLabel-root": {
              transformOrigin: "top left",
            },
          },
        ]}
      />
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
