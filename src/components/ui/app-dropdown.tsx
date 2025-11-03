import { forwardRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export interface AppDropdownOption {
  label: string;
  value: string | number;
}

export interface AppDropdownProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  options: AppDropdownOption[];
  size?: "small" | "medium";
  fullWidth?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  sx?: SxProps<Theme>;
}

const AppDropdown = forwardRef<HTMLDivElement, AppDropdownProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      options,
      size = "medium",
      fullWidth = true,
      disabled = false,
      rounded = true,
      sx,
    },
    ref
  ) => {
    const handleChange = (e: SelectChangeEvent<string | number>) => {
      if (onChange) onChange(e.target.value);
    };

    return (
      <FormControl
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        sx={[
          {
            "& .MuiOutlinedInput-root": {
              borderRadius: rounded ? 2 : 1,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        ref={ref}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          value={value !== undefined ? String(value) : ""}
          onChange={handleChange}
          displayEmpty
          label={label}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

AppDropdown.displayName = "AppDropdown";

export default AppDropdown;
