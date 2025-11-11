import React, {
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AppButton from "../components/ui/app-button";

// ---------------------------------------------
// Types
// ---------------------------------------------
interface StoreFormData {
  name: string;
  category: string;
  brandName?: string;
  description?: string;
  storeIcon: File | null;
  storeBanner: File | null;
  youtube?: string;
  facebook?: string;
  instagram?: string;
}

interface SingleImageUploadProps {
  image: File | null;
  setImage: (file: File | null) => void;
  label: string;
  height?: number;
}

const storeCategories: string[] = [
  "Grocery",
  "Electronics",
  "Clothing",
  "Pharmacy",
  "Home Decor",
  "Other",
];

// ---------------------------------------------
// Reusable Single Image Upload Component
// ---------------------------------------------
const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  image,
  setImage,
  label,
  height = 200,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => {
    setIsDragging(false);
  };

  const handleDelete = (): void => {
    setImage(null);
  };

  return (
    <Box sx={{ width: "100%", position: "relative", mb: 3 }}>
      {/* Upload Zone */}
      {!image && (
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            height,
            border: "2px dashed",
            borderColor: isDragging ? "primary.main" : "grey.400",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            bgcolor: isDragging ? "action.hover" : "#f9f9f9",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            Drag & drop or click to upload {label}
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              opacity: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </Box>
      )}

      {/* Image Preview */}
      {image && (
        <Box sx={{ position: "relative", height }}>
          <Box
            component="img"
            src={URL.createObjectURL(image)}
            alt={label}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <IconButton
            onClick={handleDelete}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

// ---------------------------------------------
// Store Registration Page
// ---------------------------------------------
const StoreRegistrationPage: React.FC = () => {
  const [form, setForm] = useState<StoreFormData>({
    name: "",
    category: "",
    brandName: "",
    description: "",
    storeIcon: null,
    storeBanner: null,
    youtube: "",
    facebook: "",
    instagram: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!form.name || !form.category || !form.storeIcon || !form.storeBanner) {
      alert("Please fill all required fields and upload images.");
      return;
    }
    console.log("Store Registration Data:", form);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" mb={4}>
        Register Your Store
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Banner Upload */}
        <SingleImageUpload
          image={form.storeBanner}
          setImage={(file: File | null) =>
            setForm({ ...form, storeBanner: file })
          }
          label="Store Banner"
          height={250}
        />

        {/* Two Column Section */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          {/* Left Column: Icon Upload */}
          <Box sx={{ flexShrink: 0, width: { xs: "100%", sm: 200 } }}>
            <SingleImageUpload
              image={form.storeIcon}
              setImage={(file: File | null) =>
                setForm({ ...form, storeIcon: file })
              }
              label="Store Icon"
              height={200}
            />
          </Box>

          {/* Right Column: Form Fields */}
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                label="Store Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Store Bio"
                name="description"
                value={form.description}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                select
                required
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {storeCategories.map((cat: string) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Brand Name (Optional)"
                name="brandName"
                value={form.brandName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="YouTube (Optional)"
                name="youtube"
                value={form.youtube}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Facebook (Optional)"
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Instagram (Optional)"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </Box>

        {/* Buttons */}
        <Stack spacing={2} direction="column">
          <AppButton type="submit" variant="primary" fullWidth>
            Register Store
          </AppButton>
          <AppButton variant="danger" fullWidth>
            Cancel
          </AppButton>
        </Stack>
      </form>
    </Box>
  );
};

export default StoreRegistrationPage;
