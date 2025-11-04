// src/components/cards/product-card.tsx
import React from "react";
import AppCard from "../ui/app-card";
import { Box, Typography, Rating } from "@mui/material";

interface ProductCardProps {
  image: string;
  title: string;
  description?: string;
  price: string | number;
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  price,
  rating = 0,
  ...cardProps
}) => {
  return (
    <AppCard {...cardProps}>
      {/* Price and Rating */}
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          ${price}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {rating.toFixed(1)}
          </Typography>
        </Box>
      </Box>
    </AppCard>
  );
};

export default ProductCard;
