// TODO: to be converted to formik and yup | react hook forms
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Grid, MenuItem } from "@mui/material";
import type { UserProfile } from "../types";
import AppButton from "./ui/app-button";
import AppInput from "./ui/app-input";

interface ProfileModalProps {
  open: boolean;
  initial?: UserProfile | null;
  onClose: () => void;
  onSave: (data: UserProfile) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  initial = null,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<UserProfile>(
    initial || {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: "",
      address: "",
      role: "",
    }
  );

  useEffect(() => {
    if (initial) setForm(initial);
    else
      setForm({
        id: Date.now().toString(),
        name: "",
        email: "",
        phone: "",
        birthDate: "",
        gender: "",
        address: "",
        role: "",
      });
  }, [initial, open]);

  const handleSave = () => {
    if (!form.name || !form.email) return;
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
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>

        <Grid container sx={{ gap: 2 }}>
          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="Name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
          </Grid>

          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
            />
          </Grid>

          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm((s) => ({ ...s, phone: e.target.value }))
              }
            />
          </Grid>

          <Grid sx={{ width: "48%" }}>
            <AppInput
              fullWidth
              label="Birth Date"
              type="date"
              value={form.birthDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setForm((s) => ({ ...s, birthDate: e.target.value }))
              }
            />
          </Grid>
          {/* ✅ Added Address Field */}
          <Grid sx={{ width: "100%" }}>
            <AppInput
              fullWidth
              label="Address"
              value={form.address}
              onChange={(e) =>
                setForm((s) => ({ ...s, address: e.target.value }))
              }
            />
          </Grid>
          <Grid sx={{ width: "48%" }}>
            <AppInput
              select
              fullWidth
              label="Gender"
              value={form.gender}
              onChange={(e) =>
                setForm((s) => ({ ...s, gender: e.target.value as any }))
              }
            >
              <MenuItem value="">Prefer not to say</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </AppInput>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              mt: 2,
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

export default ProfileModal;
