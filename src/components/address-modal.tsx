// TODO: to be converted to formik and yup | react hook forms
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import AppButton from "./ui/app-button";
import AppInput from "./ui/app-input";
import type { Address } from "../types";

interface AddressModalProps {
  open: boolean;
  title: string; // ✅ new title prop
  initial: Address | null;
  onClose: () => void;
  onSave: (address: Address) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  open,
  title,
  initial = null,
  onClose,
  onSave,
}) => {
  const theme = useTheme();

  const [form, setForm] = useState<Address>(
    initial || {
      id: Date.now().toString(),
      name: "",
      addressLine1: "",
      addressLine2: "",
      postalCode: "",
      city: "",
      province: "",
      phone: "",
      isDefault: false,
      type: "home",
    }
  );

  useEffect(() => {
    if (initial) setForm(initial);
    else
      setForm({
        id: Date.now().toString(),
        name: "",
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        city: "",
        province: "",
        phone: "",
        isDefault: false,
        type: "home",
      });
  }, [initial, open]);

  const handleChange = (k: keyof Address, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.addressLine1 || !form.postalCode || !form.phone)
      return;
    onSave(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 640,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        {/* ✅ Heading */}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            // color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Grid container sx={{ gap: 2 }}>
          <Grid sx={{ width: "100%" }}>
            <AppInput
              fullWidth
              label="Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>

          <Grid sx={{ width: "100%" }}>
            <AppInput
              fullWidth
              label="Address Line 1"
              value={form.addressLine1}
              onChange={(e) => handleChange("addressLine1", e.target.value)}
            />
          </Grid>

          <Grid sx={{ width: "100%" }}>
            <AppInput
              fullWidth
              label="Address Line 2"
              value={form.addressLine2}
              onChange={(e) => handleChange("addressLine2", e.target.value)}
            />
          </Grid>

          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="Postal Code"
              value={form.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
            />
          </Grid>

          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Grid>

          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="Province"
              value={form.province}
              onChange={(e) => handleChange("province", e.target.value)}
            />
          </Grid>

          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Grid>

          {/* ✅ ToggleButtonGroup with styled selected color */}
          <Grid sx={{ width: "100%", mt: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
              Address type:
            </Typography>
            <ToggleButtonGroup
              value={form.type}
              exclusive
              onChange={(_, v) => v && handleChange("type", v)}
            >
              {["home", "office"].map((val) => (
                <ToggleButton
                  key={val}
                  value={val}
                  sx={{
                    px: 3,
                    textTransform: "capitalize",
                    borderColor: theme.palette.divider,
                    "&.Mui-selected": {
                      color: theme.palette.primary.contrastText,
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    },
                  }}
                >
                  {val}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>

          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              mt: 3,
            }}
          >
            <AppButton variant="secondary" onClick={onClose}>
              Cancel
            </AppButton>
            <AppButton variant="primary" onClick={handleSave}>
              Save
            </AppButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddressModal;
