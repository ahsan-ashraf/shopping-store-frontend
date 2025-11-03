import React from "react";
import AppCard from "../ui/app-card";
import { CardActions, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppButton from "../ui/app-button";

interface ProductCardProps {
  image: string;
  title: string;
  description?: string;
  price: string | number;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { onAddToCart, onAddToWishlist, ...cardProps } = props;

  return (
    <AppCard {...cardProps}>
      <CardActions className="flex justify-between items-center px-3 pb-3">
        <AppButton variant="primary" onClick={onAddToCart}>
          Add to Cart
        </AppButton>
        <IconButton onClick={onAddToWishlist}>
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>
    </AppCard>
  );
};

export default ProductCard;
