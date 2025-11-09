import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import type { Registration } from "../../../types";

interface UserRegistrationFormProps {
  role: Registration;
}

const storeCategories = [
  "Electronics",
  "Fashion",
  "Grocery",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Other",
];

const RegistrationForm: React.FC<UserRegistrationFormProps> = ({ role }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: null as Dayjs | null,
    gender: "",
    address: "",
    // seller fields
    storeName: "",
    businessId: "",
    storeAddress: "",
    storeCategory: "",
    bankAccount: "",
    website: "",
    // rider fields
    vehicleRegNumber: "",
    storeProvidedPhone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e: any) =>
    setForm({ ...form, gender: e.target.value });
  const handleCategoryChange = (e: any) =>
    setForm({ ...form, storeCategory: e.target.value });
  const handleDateChange = (date: Dayjs | null) =>
    setForm({ ...form, birthDate: date });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // common fields
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.birthDate) newErrors.birthDate = "Birth date is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.address.trim()) newErrors.address = "Address is required";

    // seller-specific fields
    if (role === "seller") {
      if (!form.storeName.trim())
        newErrors.storeName = "Store Name is required";
      if (!form.businessId.trim())
        newErrors.businessId = "Business ID is required";
      if (!form.storeAddress.trim())
        newErrors.storeAddress = "Store Address is required";
      if (!form.storeCategory.trim())
        newErrors.storeCategory = "Store Category is required";
      if (!form.bankAccount.trim())
        newErrors.bankAccount = "Bank Account is required";
      // website is optional
    }

    // rider-specific fields
    if (role === "rider") {
      if (!form.vehicleRegNumber.trim())
        newErrors.vehicleRegNumber = "Vehicle Registration Number is required";
      // storeProvidedPhone is optional/read-only
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(`${role} Registration Data:`, form);
  };

  // dynamic form title
  const getTitle = () => {
    switch (role) {
      case "buyer":
        return "Buyer Registration";
      case "seller":
        return "Seller Registration";
      case "rider":
        return "Rider Registration";
      case "admin":
        return "Admin Registration";
      default:
        return "Registration";
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 6,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h4" mb={3} textAlign="center">
            {getTitle()}
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            <Grid container sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {/* First row: Name + Phone */}
              <Grid sx={{ flex: 1, minWidth: "45%" }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid sx={{ flex: 1, minWidth: "45%" }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  disabled={role === "rider"} // rider phone is provided by store
                />
              </Grid>

              {/* Second row: Birth Date + Gender */}
              <Grid sx={{ flex: 1, minWidth: "45%" }}>
                <DatePicker
                  label="Birth Date"
                  value={form.birthDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.birthDate,
                      helperText: errors.birthDate,
                    },
                  }}
                />
              </Grid>
              <Grid sx={{ flex: 1, minWidth: "45%" }}>
                <FormControl fullWidth error={!!errors.gender}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={form.gender}
                    onChange={handleGenderChange}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography color="error" variant="caption">
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Third row: Address full width */}
              <Grid sx={{ flex: 1, minWidth: "100%" }}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  multiline
                  rows={3}
                />
              </Grid>

              {/* Seller-specific fields */}
              {role === "seller" && (
                <>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <TextField
                      fullWidth
                      label="Store Name"
                      name="storeName"
                      value={form.storeName}
                      onChange={handleChange}
                      error={!!errors.storeName}
                      helperText={errors.storeName}
                    />
                  </Grid>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <TextField
                      fullWidth
                      label="Business ID / Tax ID"
                      name="businessId"
                      value={form.businessId}
                      onChange={handleChange}
                      error={!!errors.businessId}
                      helperText={errors.businessId}
                    />
                  </Grid>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <TextField
                      fullWidth
                      label="Store Address"
                      name="storeAddress"
                      value={form.storeAddress}
                      onChange={handleChange}
                      error={!!errors.storeAddress}
                      helperText={errors.storeAddress}
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <FormControl fullWidth error={!!errors.storeCategory}>
                      <InputLabel>Store Category</InputLabel>
                      <Select
                        value={form.storeCategory}
                        onChange={handleCategoryChange}
                        label="Store Category"
                      >
                        {storeCategories.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.storeCategory && (
                        <Typography color="error" variant="caption">
                          {errors.storeCategory}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <TextField
                      fullWidth
                      label="Bank Account"
                      name="bankAccount"
                      value={form.bankAccount}
                      onChange={handleChange}
                      error={!!errors.bankAccount}
                      helperText={errors.bankAccount}
                    />
                  </Grid>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <TextField
                      fullWidth
                      label="Website / Social Media"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </Grid>
                </>
              )}

              {/* Rider-specific fields */}
              {role === "rider" && (
                <>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <TextField
                      fullWidth
                      label="Vehicle Registration Number"
                      name="vehicleRegNumber"
                      value={form.vehicleRegNumber}
                      onChange={handleChange}
                      error={!!errors.vehicleRegNumber}
                      helperText={errors.vehicleRegNumber}
                    />
                  </Grid>
                  <Grid sx={{ flex: 1, minWidth: "100%" }}>
                    <TextField
                      fullWidth
                      label="Phone Provided by Store"
                      name="storeProvidedPhone"
                      value={form.storeProvidedPhone}
                      onChange={handleChange}
                      placeholder="Optional"
                      disabled
                    />
                  </Grid>
                </>
              )}

              {/* Register button */}
              <Grid sx={{ flex: 1, minWidth: "100%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default RegistrationForm;
