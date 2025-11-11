import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import StoreHome from "./components/store-home";
import type { Store, StoreStats } from "../../types";
import StoreStatistics from "./components/store-stats";

import { type Product } from "../../types";
import StoreProducts from "./components/store-products";

const storeData: Store = {
  id: "1",
  name: "FreshMart Superstore",
  bio: "Your one-stop shop for organic groceries, fresh produce, and home essentials.",
  category: "Grocery",
  brand: "FreshMart",
  banner:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80",
  icon: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&q=80",
  socials: {
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

function generateStoreStats(count: number = 10): StoreStats[] {
  return Array.from({ length: count }).map((_, i) => {
    const day = 10 + i; // just an example starting day
    return {
      date: `2025-10-${day < 10 ? `0${day}` : day}`,
      impressions: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 500),
      orders: Math.floor(Math.random() * 100),
      cancelRate: `${Math.floor(Math.random() * 10)}%`,
      successRate: `${80 + Math.floor(Math.random() * 15)}%`,
      returnRate: `${Math.floor(Math.random() * 5)}%`,
    };
  });
}
function generateProducts(count: number = 10): Product[] {
  return Array.from({ length: count }).map((_, i) => {
    const day = 10 + i; // simple date
    return {
      id: Math.random()
        .toString(36)
        .substring(2, 2 + length),
      image: `https://picsum.photos/seed/${i}/200/200`, // random image
      title: `Product ${i + 1}`,
      description: `This is a sample description for Product ${i + 1}.`,
      price: parseFloat((Math.random() * 500).toFixed(2)), // price 0-500
      addedDate: `2025-10-${day < 10 ? `0${day}` : day}`,
      views: Math.floor(Math.random() * 1000),
      orders: Math.floor(Math.random() * 200),
      cancelations: Math.floor(Math.random() * 20),
      returns: Math.floor(Math.random() * 15),
      success: Math.floor(80 + Math.random() * 15), // success 80-95%
    };
  });
}

const statsData: StoreStats[] = generateStoreStats(10);

const productsData: Product[] = generateProducts(10);
console.log(productsData);

// ---------------------------------------------
// Main Component
// ---------------------------------------------
const StoreViewPage: React.FC = () => {
  const navigate = useNavigate();
  const handleDeleteStore = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this store? This action cannot be undone."
    );
    if (confirmDelete) alert("Store deleted (simulate API call)");
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", mt: 3, px: 3, pb: 6 }}>
      <StoreHome storeData={storeData} />
      <StoreStatistics storeData={statsData} />
      <StoreProducts data={productsData} />

      {/* Danger Zone */}
      <Paper sx={{ p: 3, bgcolor: "#fff0f0", border: "1px solid #ffcccc" }}>
        <Typography variant="h6" color="error" mb={1}>
          Danger Zone
        </Typography>
        <Typography variant="body2" mb={2}>
          Deleting your store will remove all associated products and statistics
          permanently.
        </Typography>
        <Button variant="contained" color="error" onClick={handleDeleteStore}>
          Delete Store
        </Button>
      </Paper>
    </Box>
  );
};

export default StoreViewPage;
