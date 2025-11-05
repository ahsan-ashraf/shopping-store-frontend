import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import AppSearchBar from "../components/ui/app-searach-bar";
import AppImageSlider from "../components/ui/app-image-slider";
import SectionHeader from "../components/ui/secion-header";
import ProductCard from "../components/cards/product-card";
import CategoryCard from "../components/cards/category-card";
import AppButton from "../components/ui/app-button";

const Home: React.FC = () => {
  const [visibleRecommendations, setVisibleRecommendations] = useState(3);

  // Dummy slider images
  const demoImages = [
    { url: "https://picsum.photos/id/1018/800/400", alt: "Banner 1" },
    { url: "https://picsum.photos/id/1015/800/400", alt: "Banner 2" },
    { url: "https://picsum.photos/id/1016/800/400", alt: "Banner 3" },
    { url: "https://picsum.photos/id/1019/800/400", alt: "Banner 4" },
  ];

  // Dummy products
  const sampleProducts = [
    {
      id: 1,
      title: "Wireless Headphones",
      description: "High-quality over-ear headphones with noise cancellation.",
      image: "https://picsum.photos/400/250?random=1",
      price: 99.99,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Smartwatch Pro",
      description: "Track your health and fitness with premium sensors.",
      image: "https://picsum.photos/400/250?random=2",
      price: 149.5,
      rating: 4.0,
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      description: "Portable and waterproof, perfect for outdoor adventures.",
      image: "https://picsum.photos/400/250?random=3",
      price: 59.0,
      rating: 4.2,
    },
    {
      id: 4,
      title: "Gaming Mouse",
      description: "High-precision wired mouse for gaming enthusiasts.",
      image: "https://picsum.photos/400/250?random=4",
      price: 45.99,
      rating: 4.7,
    },
    {
      id: 5,
      title: "Laptop Backpack",
      description: "Durable backpack with multiple compartments.",
      image: "https://picsum.photos/400/250?random=5",
      price: 39.99,
      rating: 4.1,
    },
    {
      id: 6,
      title: "Smart LED Bulb",
      description: "Control lighting with your smartphone or voice assistant.",
      image: "https://picsum.photos/400/250?random=6",
      price: 19.99,
      rating: 4.3,
    },
  ];

  // Dummy categories
  const sampleCategories = [
    {
      id: 1,
      title: "Electronics",
      image: "https://picsum.photos/150/150?electronics",
    },
    { id: 2, title: "Fashion", image: "https://picsum.photos/150/150?fashion" },
    {
      id: 3,
      title: "Home Appliances",
      image: "https://picsum.photos/150/150?appliances",
    },
    {
      id: 4,
      title: "Furniture",
      image: "https://picsum.photos/150/150?furniture",
    },
    { id: 5, title: "Toys", image: "https://picsum.photos/150/150?toys" },
    { id: 6, title: "Books", image: "https://picsum.photos/150/150?books" },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  // Load more handler
  const handleLoadMore = () => {
    setVisibleRecommendations((prev) => prev + 3); // load 3 more on each click
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* <ConfirmModal
        open
        description="TESTING THIS MODAL TESTING"
        cancelButtonVariant="secondary"
        confirmButtonVariant="danger"
        onCancel={() => {}}
        onConfirm={() => {}}
      /> */}

      {/* <AddressModal
        open
        title="Add New Address..."
        initial={null}
        onClose={() => {}}
        onSave={() => {}}
      /> */}
      {/* <ProfileModal open onClose={() => {}} onSave={() => {}} initial={null} /> */}

      {/* Search Bar */}
      <AppSearchBar
        placeholder="Search for products, categories..."
        onSearch={handleSearch}
      />

      {/* Image Slider */}
      <Box sx={{ width: "100%", mt: 3 }}>
        <AppImageSlider images={demoImages} interval={5000} />
      </Box>

      {/* Sales Section */}
      <Box sx={{ mt: 5 }}>
        <SectionHeader
          title="Sales"
          action={{
            label: "See All",
            onClick: () => console.log("See all sales"),
          }}
        />
        <Grid container spacing={2}>
          {sampleProducts.slice(0, 6).map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
              <ProductCard
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mt: 6 }}>
        <SectionHeader
          title="Categories"
          action={{
            label: "See All",
            onClick: () => console.log("See all categories"),
          }}
        />
        <Grid container spacing={2}>
          {sampleCategories.map((cat) => (
            <Grid key={cat.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <CategoryCard
                image={cat.image}
                title={cat.title}
                onClick={() => console.log(`${cat.title} clicked`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recommended / Just For You Section */}
      <Box sx={{ mt: 6 }}>
        <SectionHeader title="Just For You" />
        <Grid container spacing={2}>
          {sampleProducts.slice(0, visibleRecommendations).map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
              <ProductCard
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.rating}
              />
            </Grid>
          ))}
        </Grid>

        {visibleRecommendations < sampleProducts.length && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <AppButton onClick={handleLoadMore}>Load More</AppButton>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
