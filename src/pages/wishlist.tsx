// src/pages/wishlist.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Checkbox,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AppButton from "../components/ui/app-button";
import SectionHeader from "../components/ui/secion-header";
import ProductItem from "../components/product-item";

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
      {/* Section Header */}
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
              <AddShoppingCartIcon
                color="primary"
                onClick={handleAddToCart}
                style={{ cursor: "pointer" }}
              />
            )}
            <DeleteIcon
              color="error"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>
      )}

      {/* Items */}
      {items.length > 0 ? (
        items.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            inStock={item.inStock}
            checked={selectedIds.includes(item.id)}
            showAddToCart={allowAddToCart && item.inStock}
            showWishlistIcon={false} // wishlist icon not needed here
            moveWishlistBelowPrice={false} // keep icons on right like current wishlist
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
      <SectionHeader title="My Wishlists" />

      <AppButton
        fullWidth
        variant="primary"
        color="primary"
        sx={{ mt: 2, mb: 4 }}
      >
        Add All to Cart
      </AppButton>

      <WishlistSection title="Back in Stock" items={inStockItems} />
      <WishlistSection
        title="Out of Stock"
        items={outOfStockItems}
        allowAddToCart={false}
      />
    </Container>
  );
};

export default Wishlist;
