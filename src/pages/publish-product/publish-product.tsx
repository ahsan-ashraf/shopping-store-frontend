import React, { useState, type KeyboardEvent } from "react";
import { Box, Typography, Chip, Stack, Button } from "@mui/material";
import MediaUpload from "./media-upload";
import AppInput from "../../components/ui/app-input";
import AppButton from "../../components/ui/app-button";

interface ProductFormData {
  title: string;
  brand: string;
  price: string;
  salePrice: string;
  colors: string[];
  sizes: string[];
  description: string;
  keywords: string[];
}

const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_KEYWORDS = 20;

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];
const COLOR_OPTIONS = ["Red", "Blue", "Green", "Yellow", "Black"];

const PublishProduct: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    brand: "",
    price: "",
    salePrice: "",
    colors: [],
    sizes: [],
    description: "",
    keywords: [],
  });
  const [keywordInput, setKeywordInput] = useState("");

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSize = (size: string) => {
    handleChange(
      "sizes",
      formData.sizes.includes(size)
        ? formData.sizes.filter((s) => s !== size)
        : [...formData.sizes, size]
    );
  };

  const toggleColor = (color: string) => {
    handleChange(
      "colors",
      formData.colors.includes(color)
        ? formData.colors.filter((c) => c !== color)
        : [...formData.colors, color]
    );
  };

  const handleAddKeyword = () => {
    if (formData.keywords.length >= MAX_KEYWORDS) return;
    const trimmed = keywordInput.trim();
    if (trimmed && !formData.keywords.includes(trimmed)) {
      handleChange("keywords", [...formData.keywords, trimmed]);
      setKeywordInput("");
    }
  };

  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleDeleteKeyword = (kw: string) => {
    handleChange(
      "keywords",
      formData.keywords.filter((k) => k !== kw)
    );
  };

  const handlePublish = () => {
    console.log("Publishing product...", { ...formData, images });
  };

  const isKeywordDisabled = formData.keywords.length >= MAX_KEYWORDS;

  return (
    <Box sx={{ p: 4 }}>
      {/* Main Heading */}
      <Typography variant="h4" sx={{ mb: 4 }}>
        Add New Product
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          gap: 4,
        }}
      >
        {/* Left Column: Media Upload */}
        <Box>
          <MediaUpload images={images} setImages={setImages} />
        </Box>

        {/* Right Column: Product Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6">Product Details</Typography>

          <AppInput
            label="Product Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter product title"
            inputProps={{ maxLength: 100, minLength: 10 }}
          />

          <AppInput
            label="Brand Name"
            value={formData.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            placeholder="Enter brand name"
          />

          <AppInput
            label="Original Price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Enter original price"
          />

          <AppInput
            label="Sale Price (optional)"
            type="number"
            value={formData.salePrice}
            onChange={(e) => handleChange("salePrice", e.target.value)}
            placeholder="Enter sale price"
          />

          {/* Size selection */}
          <Box>
            <Typography variant="subtitle1">Sizes</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {SIZE_OPTIONS.map((size) => (
                <Button
                  key={size}
                  variant={
                    formData.sizes.includes(size) ? "contained" : "outlined"
                  }
                  color={formData.sizes.includes(size) ? "primary" : "inherit"}
                  onClick={() => toggleSize(size)}
                  size="small"
                >
                  {size}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Color selection */}
          <Box>
            <Typography variant="subtitle1">Colors</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {COLOR_OPTIONS.map((color) => (
                <Button
                  key={color}
                  variant={
                    formData.colors.includes(color) ? "contained" : "outlined"
                  }
                  color={
                    formData.colors.includes(color) ? "primary" : "inherit"
                  }
                  onClick={() => toggleColor(color)}
                  size="small"
                >
                  {color}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Keywords input */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <AppInput
                label="Keywords"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder={
                  isKeywordDisabled
                    ? "Maximum 20 keywords reached"
                    : "Type a keyword and press Enter"
                }
                disabled={isKeywordDisabled}
              />
              <Button
                variant="contained"
                onClick={handleAddKeyword}
                sx={{ mt: "20px" }}
                disabled={isKeywordDisabled}
              >
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {formData.keywords.map((kw) => (
                <Chip
                  key={kw}
                  label={kw}
                  onDelete={() => handleDeleteKeyword(kw)}
                  color="primary"
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Description */}
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 1 }}>
        <AppInput
          label="Product Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter product description"
          multiline
          minRows={6}
          inputProps={{
            maxLength: MAX_DESCRIPTION_LENGTH,
            minLength: 100,
          }}
        />
        <Typography variant="caption" color="text.secondary" align="right">
          {MAX_DESCRIPTION_LENGTH - formData.description.length} characters
          remaining
        </Typography>
      </Box>

      {/* Publish and Cancel buttons */}
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        <AppButton variant="primary" onClick={handlePublish} fullWidth>
          Publish Product
        </AppButton>
        <AppButton
          variant="danger"
          onClick={() => console.log("Cancel adding product")}
          fullWidth
        >
          Cancel
        </AppButton>
      </Box>
    </Box>
  );
};

export default PublishProduct;
