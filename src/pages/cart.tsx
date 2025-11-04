// src/pages/cart.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import ProductItem from "../components/product-item";
import SectionHeader from "../components/ui/secion-header";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const cartItemsData = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    image: "https://picsum.photos/500/500?random=11",
    price: 8999,
    originalPrice: 10999,
    brand: "SoundMax",
    warranty: "1 Year",
    color: "Black",
    inStock: true,
    quantity: 1,
  },
  {
    id: 2,
    title: "Smart Fitness Watch Series 8 Waterproof Edition",
    image: "https://picsum.photos/500/500?random=12",
    price: 12999,
    originalPrice: 15999,
    brand: "FitPro",
    warranty: "6 Months",
    color: "Silver",
    inStock: true,
    quantity: 2,
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(cartItemsData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleToggleCheck = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === cartItems.length) setSelectedIds([]);
    else setSelectedIds(cartItems.map((i) => i.id));
  };

  const handleQuantityChange = (id: number, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleDelete = () => {
    setCartItems((prev) =>
      prev.filter((item) => !selectedIds.includes(item.id))
    );
    setSelectedIds([]);
  };

  const handleMoveToWishlist = () => {
    console.log("Move to wishlist:", selectedIds);
    setSelectedIds([]);
  };

  // Calculate subtotal, delivery charges, total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharges = subtotal > 0 ? 500 : 0; // example
  const total = subtotal + deliveryCharges;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <SectionHeader title="Shopping Cart" />

      <Box display="flex" gap={3} flexDirection={{ xs: "column", md: "row" }}>
        {/* Left Column: Cart Items (70% width) */}
        <Box flex={{ xs: 1, md: 1 }}>
          {/* Action Bar */}
          {cartItems.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                p: 1,
                mb: 1.5,
                borderRadius: 1,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox
                    checked={
                      selectedIds.length === cartItems.length &&
                      cartItems.length > 0
                    }
                    indeterminate={
                      selectedIds.length > 0 &&
                      selectedIds.length < cartItems.length
                    }
                    onChange={handleToggleAll}
                    color="primary"
                  />
                  <Typography variant="body2" fontWeight={500}>
                    {selectedIds.length} selected
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={handleMoveToWishlist}
                    sx={{ borderRadius: 1 }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={handleDelete}
                    sx={{ borderRadius: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          )}
          {/* Cart Items List */}
          <Paper elevation={3} sx={{ p: 2, borderRadius: 1 }}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <ProductItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  brand={item.brand}
                  warranty={item.warranty}
                  color={item.color}
                  inStock={item.inStock}
                  quantity={item.quantity}
                  checked={selectedIds.includes(item.id)}
                  showQuantityControls
                  showWishlistIcon
                  onToggleCheck={handleToggleCheck}
                  onQuantityChange={handleQuantityChange}
                  onDelete={() =>
                    setCartItems((prev) => prev.filter((i) => i.id !== item.id))
                  }
                  onAddToWishlist={() =>
                    console.log("Added to wishlist:", item.title)
                  }
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Your cart is empty.
              </Typography>
            )}
          </Paper>
        </Box>

        {/* Right Column: Order Summary (30% width) */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 1,
            width: { xs: "100%", md: 0.3 },
            flexShrink: 0,
            height: "fit-content",
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal ({cartItems.length} items)</Typography>
            <Typography>Rs {subtotal.toLocaleString()}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Delivery Charges</Typography>
            <Typography>Rs {deliveryCharges.toLocaleString()}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontWeight={600}>Total</Typography>
            <Typography fontWeight={600}>
              Rs {total.toLocaleString()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: 400, color: "#fff" }}
          >
            Proceed to Checkout ({cartItems.length} items)
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Cart;
