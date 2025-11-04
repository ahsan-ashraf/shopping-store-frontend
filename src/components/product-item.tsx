import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Checkbox,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export interface ProductItemProps {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  warranty?: string;
  color?: string;
  inStock: boolean;
  checked: boolean;
  quantity?: number;
  showAddToCart?: boolean;
  showWishlistIcon?: boolean;
  showQuantityControls?: boolean;
  moveWishlistBelowPrice?: boolean;
  onToggleCheck: (id: number) => void;
  onAddToCart?: () => void;
  onDelete?: () => void;
  onAddToWishlist?: () => void;
  onQuantityChange?: (id: number, newQty: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  title,
  image,
  price,
  originalPrice,
  brand,
  warranty,
  color,
  inStock,
  checked,
  quantity = 1,
  showAddToCart = false,
  showWishlistIcon = false,
  showQuantityControls = false,
  moveWishlistBelowPrice = false,
  onToggleCheck,
  onAddToCart,
  onDelete,
  onAddToWishlist,
  onQuantityChange,
}) => {
  const handleQuantityChange = (delta: number) => {
    if (onQuantityChange) onQuantityChange(id, Math.max(1, quantity + delta));
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={1.5}
        flexWrap="wrap"
      >
        {/* Checkbox */}
        <Checkbox
          checked={checked}
          onChange={() => onToggleCheck(id)}
          color="primary"
        />

        {/* Image + Info */}
        <Box
          display="flex"
          alignItems="center"
          flexGrow={1}
          ml={1}
          minWidth={0}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{ width: 70, height: 70, borderRadius: 1, objectFit: "cover" }}
          />

          <Box
            ml={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            flexGrow={1}
            minWidth={0}
          >
            {/* Title + Price Row */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              flexWrap="wrap"
              justifyContent="space-between"
            >
              <Typography
                variant="body1"
                sx={{
                  maxWidth: {
                    xs: "100%", // wrap on small screens
                    sm: "300px",
                    md: "400px",
                  },
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal", // allow wrapping
                  color: inStock ? "text.primary" : "text.secondary",
                  flexShrink: 1,
                }}
                title={title}
              >
                {title}
              </Typography>

              <Box display="flex" flexDirection="column" flexShrink={0}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: inStock ? "primary.main" : "text.secondary",
                  }}
                >
                  Rs {price.toLocaleString()}
                </Typography>
                {originalPrice && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      fontSize: 12,
                    }}
                  >
                    Rs {originalPrice.toLocaleString()}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Small info below title */}
            {(brand || warranty || color) && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 12, mt: 0.3 }}
              >
                {brand ? `Brand: ${brand} ` : ""}
                {warranty ? `| Warranty: ${warranty} ` : ""}
                {color ? `| Color: ${color}` : ""}
              </Typography>
            )}

            {/* Wishlist/Delete icons below price if prop is true */}
            {moveWishlistBelowPrice && (
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                {showWishlistIcon && onAddToWishlist && (
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={onAddToWishlist}
                    sx={{ borderRadius: 1 }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton
                    color="error"
                    size="small"
                    onClick={onDelete}
                    sx={{ borderRadius: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {/* Right side: Quantity + icons if not moved below */}
        <Box display="flex" alignItems="center" gap={1} mt={{ xs: 1, md: 0 }}>
          {showQuantityControls && (
            <>
              <IconButton size="small" onClick={() => handleQuantityChange(-1)}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <TextField
                size="small"
                value={quantity}
                inputProps={{ style: { textAlign: "center", width: 30 } }}
                onChange={(e) =>
                  onQuantityChange &&
                  onQuantityChange(id, Math.max(1, Number(e.target.value)))
                }
              />
              <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </>
          )}

          {!moveWishlistBelowPrice && showWishlistIcon && onAddToWishlist && (
            <IconButton
              color="primary"
              size="small"
              onClick={onAddToWishlist}
              sx={{ borderRadius: 1 }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
          {!moveWishlistBelowPrice && onDelete && (
            <IconButton
              color="error"
              size="small"
              onClick={onDelete}
              sx={{ borderRadius: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          )}

          {showAddToCart && onAddToCart && (
            <IconButton
              color="primary"
              onClick={onAddToCart}
              size="small"
              sx={{ borderRadius: 1 }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default ProductItem;
