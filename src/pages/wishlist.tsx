import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Divider,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AppButton from "../components/ui/app-button";
import SectionHeader from "../components/ui/secion-header";

const wishlistItems = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    image: "https://picsum.photos/500/500?random=1",
    price: 8999,
    inStock: true,
  },
  {
    id: 2,
    title: "Smart Fitness Watch Series 8 Waterproof Edition",
    image: "https://picsum.photos/500/500?random=2",
    price: 12999,
    inStock: true,
  },
  {
    id: 3,
    title: "Genuine Leather Wallet with RFID Protection",
    image: "https://picsum.photos/500/500?random=3",
    price: 2999,
    inStock: false,
  },
  {
    id: 4,
    title: "Portable Bluetooth Speaker 360 Surround Sound",
    image: "https://picsum.photos/500/500?random=4",
    price: 6999,
    inStock: false,
  },
];

interface WishlistItemProps {
  id: number;
  title: string;
  image: string;
  price: number;
  inStock: boolean;
  checked: boolean;
  onToggleCheck: (id: number) => void;
  onAddToCart?: () => void;
  onDelete?: () => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  title,
  image,
  price,
  inStock,
  checked,
  onToggleCheck,
  onAddToCart,
  onDelete,
}) => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={1.5}
      >
        {/* Checkbox */}
        <Checkbox
          checked={checked}
          onChange={() => onToggleCheck(id)}
          color="primary"
        />

        {/* Product Image + Info */}
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: 70,
              height: 70,
              borderRadius: 1,
              objectFit: "cover",
            }}
          />
          <Box ml={2} display="flex" alignItems="center" gap={2}>
            {/* Title */}
            <Typography
              variant="body1"
              noWrap
              sx={{
                maxWidth: 300,
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: inStock ? "text.primary" : "text.secondary",
              }}
              title={title}
            >
              {title}
            </Typography>

            {/* Price */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: inStock ? "primary.main" : "text.secondary",
              }}
            >
              Rs {price.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Icons */}
        <Box display="flex" alignItems="center" gap={1}>
          {inStock && (
            <IconButton
              color="primary"
              onClick={onAddToCart}
              size="small"
              sx={{ borderRadius: 1 }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
          <IconButton
            color="error"
            onClick={onDelete}
            size="small"
            sx={{ borderRadius: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

interface WishlistSectionProps {
  title: string;
  items: typeof wishlistItems;
  allowAddToCart?: boolean;
}

const WishlistSection: React.FC<WishlistSectionProps> = ({
  title,
  items,
  allowAddToCart = true,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleToggleCheck = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allChecked = selectedIds.length === items.length && items.length > 0;
  const partiallyChecked =
    selectedIds.length > 0 && selectedIds.length < items.length;

  const handleToggleAll = () => {
    if (allChecked) setSelectedIds([]);
    else setSelectedIds(items.map((i) => i.id));
  };

  const handleDelete = () => {
    console.log("Deleted selected:", selectedIds);
    setSelectedIds([]);
  };

  const handleAddToCart = () => {
    console.log("Added to cart selected:", selectedIds);
    setSelectedIds([]);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      {/* Header */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          mb: 1.5,
          color: allowAddToCart ? "primary.main" : "text.secondary",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 1 }} />

      {/* Action Bar */}
      {selectedIds.length > 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 1,
            mb: 1.5,
            backgroundColor: "action.hover",
            borderRadius: 1,
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox
              checked={allChecked}
              indeterminate={partiallyChecked}
              onChange={handleToggleAll}
              color="primary"
            />
            <Typography variant="body2" fontWeight={500}>
              {selectedIds.length} selected
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            {allowAddToCart && (
              <IconButton
                color="primary"
                size="small"
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon />
              </IconButton>
            )}
            <IconButton color="error" size="small" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Items */}
      {items.length > 0 ? (
        items.map((item) => (
          <WishlistItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            inStock={item.inStock}
            checked={selectedIds.includes(item.id)}
            onToggleCheck={handleToggleCheck}
            onAddToCart={() => console.log("Add to cart:", item.title)}
            onDelete={() => console.log("Delete:", item.title)}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No items found.
        </Typography>
      )}
    </Paper>
  );
};

const Wishlist: React.FC = () => {
  const inStockItems = wishlistItems.filter((item) => item.inStock);
  const outOfStockItems = wishlistItems.filter((item) => !item.inStock);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page Header */}
      <SectionHeader title="My Wishlists" />

      {/* Add All to Cart */}
      <AppButton
        fullWidth
        variant="primary"
        color="primary"
        sx={{ mt: 2, mb: 4 }}
      >
        Add All to Cart
      </AppButton>

      {/* Back in Stock Section */}
      <WishlistSection title="Back in Stock" items={inStockItems} />

      {/* Out of Stock Section */}
      <WishlistSection
        title="Out of Stock"
        items={outOfStockItems}
        allowAddToCart={false}
      />
    </Container>
  );
};

export default Wishlist;
