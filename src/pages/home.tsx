import React, { useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import AppSearchBar from "../components/ui/app-searach-bar";
import AppImageSlider from "../components/ui/app-image-slider";
import AppCard from "../components/ui/app-card";
import ProductCard from "../components/cards/product-card";
import CategoryCard from "../components/cards/category-card";
import SectionHeader from "../components/ui/secion-header";

const Home: React.FC = () => {
  const handleSearch = (query: string) => {
    if (!query) return;
    console.log("Searching for:", query);
    // You can trigger API calls here, for example:
    // fetchProducts({ search: query });
  };
  const [category, setCategory] = useState<number | string>("");

  const sampleProducts = [
    {
      id: 1,
      title: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      image: "https://picsum.photos/400/250?random=1",
      price: 99.99,
    },
    {
      id: 2,
      title: "Smartwatch Pro",
      description: "Track your health and fitness with premium sensors.",
      image: "https://picsum.photos/400/250?random=1",
      price: 149.5,
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      description: "Portable and waterproof, perfect for outdoor adventures.",
      image: "https://picsum.photos/400/250?random=1",
      price: 59.0,
    },
    {
      id: 4,
      title: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      image: "https://picsum.photos/400/250?random=1",
      price: 99.99,
    },
    {
      id: 5,
      title: "Smartwatch Pro",
      description: "Track your health and fitness with premium sensors.",
      image: "https://picsum.photos/400/250?random=1",
      price: 149.5,
    },
    {
      id: 6,
      title: "Bluetooth Speaker",
      description: "Portable and waterproof, perfect for outdoor adventures.",
      image: "https://picsum.photos/400/250?random=1",
      price: 59.0,
    },
    {
      id: 7,
      title: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      image: "https://picsum.photos/400/250?random=1",
      price: 99.99,
    },
    {
      id: 8,
      title: "Smartwatch Pro",
      description: "Track your health and fitness with premium sensors.",
      image: "https://picsum.photos/400/250?random=1",
      price: 149.5,
    },
    {
      id: 9,
      title:
        "Bluetooth SpeakerBluetooth SpeakerBluetooth SpeakerBluetooth SpeakerBluetooth SpeakerBluetooth SpeakerBluetooth Speaker",
      description: "Portable and waterproof, perfect for outdoor adventures.",
      image: "https://picsum.photos/400/250?random=1",
      price: 59.0,
    },
  ];
  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
  };

  const handleAddToWishlist = (productId: number) => {
    console.log(`Added product ${productId} to wishlist`);
  };
  const demoImages = [
    { url: "https://picsum.photos/id/1018/800/400", alt: "Banner 1" },
    { url: "https://picsum.photos/id/1015/800/400", alt: "Banner 2" },
    { url: "https://picsum.photos/id/1016/800/400", alt: "Banner 2" },
    { url: "https://picsum.photos/id/1019/800/400", alt: "Banner 2" },
  ];
  const categories = [
    {
      title: "Electronics",
      image: "https://picsum.photos/id/1018/800/400",
    },
    { title: "Fashion", image: "https://picsum.photos/id/1018/800/400" },
    {
      title: "Furniture",
      image: "https://picsum.photos/id/1018/800/400",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
      }}
    >
      {/* <Typography variant="h5" fontWeight={600}>
        Welcome to Our Store 🛍️
      </Typography> */}
      <AppSearchBar
        placeholder="Search for products, categories..."
        onSearch={handleSearch}
        buttonText="Search"
        loading={false} // Set true when fetching data
      />
      {/* <Box sx={{ p: 2, width: 300 }}>
        <AppDropdown
          // label="Category"
          placeholder="Select a category"
          value={category}
          onChange={(val) => setCategory(val)}
          options={[
            { label: "Electronics", value: "electronics" },
            { label: "Clothing", value: "clothing" },
            { label: "Home Appliances", value: "appliances" },
          ]}
        />
      </Box> */}
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        <AppImageSlider images={demoImages} interval={5000} />
      </div>
      <SectionHeader title="App Cards" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
          p: 2,
        }}
      >
        <AppCard
          image="https://picsum.photos/400/250?random=1"
          title="Wireless HeadphonesWireless HeadphonesWireless HeadphonesWireless HeadphonesWireless Headphones"
          description="High-quality over-ear headphones with noise cancellation."
        />

        <AppCard
          image="https://picsum.photos/400/250?random=2"
          title="Smart Watch"
          description="Track your fitness and notifications with ease."
        />
      </Box>
      <SectionHeader title="Products" />
      <Grid container spacing={1} padding={1}>
        {sampleProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <ProductCard
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              onAddToCart={() => handleAddToCart(product.id)}
              onAddToWishlist={() => handleAddToWishlist(product.id)}
            />
          </Grid>
        ))}
      </Grid>
      <SectionHeader title="Categories" />
      <Grid container spacing={2}>
        {categories.map((cat, idx) => (
          <Grid key={idx} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <CategoryCard
              title={cat.title}
              image={cat.image}
              onClick={() => console.log(`${cat.title} clicked`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
