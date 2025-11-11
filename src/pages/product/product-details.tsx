import React, { useState } from "react";
import {
  Divider,
  Container,
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  Rating,
  MenuItem,
  Paper,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AppButton from "../../components/ui/app-button";
import ProductStats from "./products-stats";

const reviews = [
  {
    name: "A***",
    verified: true,
    date: "29 Aug 2024",
    rating: 5,
    text: "Quality Achi ha. Time per delivered hogya tha ❤️",
    likes: 62,
    image: "https://picsum.photos/80?random=1",
  },
  {
    name: "Haziq S.",
    verified: true,
    date: "05 Feb 2025",
    rating: 5,
    text: "The mask is great and fits well, totally satisfied!",
    likes: 18,
  },
  {
    name: "Saad A.",
    verified: false,
    date: "02 Jan 2025",
    rating: 3,
    text: "Sound quality is okay but not as expected.",
    likes: 4,
  },
];
const dummyProduct = {
  id: 1,
  title: "Wireless Headphones Pro",
  brand: "SoundMax",
  store: "Tech Store",
  rating: 4.3,
  images: [
    "https://picsum.photos/500/500?random=1",
    "https://picsum.photos/500/500?random=2",
    "https://picsum.photos/500/500?random=3",
  ],
  price: 120,
  salePrice: 99,
  onSale: true,
  colors: ["Black", "White", "Blue"],
  sizes: ["S", "M", "L", "XL"],
  details: `
These wireless headphones deliver high-fidelity audio with deep bass and crisp highs. 
Enjoy up to 30 hours of playtime on a single charge, and quickly recharge via USB-C.

Features include:
- Active Noise Cancellation (ANC)
- Bluetooth 5.2 for ultra-stable connection
- Soft memory foam ear cushions
- Built-in microphone for calls
- Foldable and lightweight design

Compatible with Android, iOS, and Windows devices.
  `,
};

interface Props {
  isOrderView: boolean;
}

const ProductDetails: React.FC<Props> = ({ isOrderView = true }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(dummyProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(dummyProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [filterRating, setFilterRating] = useState("all");

  const addresses = [
    { label: "Home - Street 123, Karachi", value: "Home" },
    { label: "Office - DHA Phase 6, Karachi", value: "Office" },
  ];

  const filteredReviews =
    filterRating === "all"
      ? reviews
      : reviews.filter((r) => r.rating === Number(filterRating));

  const paymentOptions = [
    "Payoneer",
    "PayPak",
    "JazzCash",
    "EasyPaisa",
    "Cash on Delivery",
  ];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? dummyProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === dummyProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 1 }}>
        {/* ========== MAIN 3-COLUMN LAYOUT ========== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {/* === Column 1: Product Images === */}
          <Box>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={dummyProduct.images[selectedImageIndex]}
                alt={dummyProduct.title}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  mb: 2,
                  objectFit: "cover",
                  aspectRatio: "1 / 1",
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={handlePrevImage}>
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {dummyProduct.images.map((img, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setSelectedImageIndex(idx)}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        border:
                          idx === selectedImageIndex
                            ? "2px solid"
                            : "1px solid #ccc",
                        borderColor:
                          idx === selectedImageIndex
                            ? "primary.main"
                            : "divider",
                        cursor: "pointer",
                        objectFit: "cover",
                        transition: "0.2s",
                        "&:hover": { opacity: 0.8 },
                      }}
                    />
                  ))}
                </Box>
                <IconButton onClick={handleNextImage}>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* === Column 2: Product Info === */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">{dummyProduct.title}</Typography>
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Rating value={dummyProduct.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {dummyProduct.rating.toFixed(1)}
              </Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Brand: {dummyProduct.brand}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mt: 0.5, cursor: "pointer", color: "primary.main" }}
            >
              Store: {dummyProduct.store}
            </Typography>

            {dummyProduct.onSale ? (
              <Box
                sx={{
                  mt: 2,
                  p: 2.5,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                  border: "1px solid #f57c00",
                  color: "common.white",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(245, 124, 0, 0.5)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: -30,
                    transform: "rotate(45deg)",
                    bgcolor: "#f57c00",
                    color: "common.white",
                    px: 5,
                    py: 0.5,
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: 1,
                    boxShadow: "0 2px 6px rgba(245, 124, 0, 0.6)",
                  }}
                >
                  SALE
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        opacity: 0.9,
                      }}
                    >
                      ${dummyProduct.price}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "common.white",
                      }}
                    >
                      ${dummyProduct.salePrice}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontStyle: "italic",
                        opacity: 0.9,
                      }}
                    >
                      Limited Time Offer!
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      ⏳ Ends in
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      02:15:30
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                ${dummyProduct.price}
              </Typography>
            )}

            {/* Color Selection */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Color:</Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                {dummyProduct.colors.map((color) => (
                  <AppButton
                    key={color}
                    variant={selectedColor === color ? "primary" : "secondary"}
                    onClick={() => setSelectedColor(color)}
                    size="small"
                    disabled={
                      isOrderView && selectedColor === color
                        ? false
                        : isOrderView
                    }
                  >
                    <Typography sx={{ fontSize: 14 }}>{color}</Typography>
                  </AppButton>
                ))}
              </Box>
            </Box>

            {/* Size Selection */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Size:</Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                {dummyProduct.sizes.map((size) => (
                  <AppButton
                    key={size}
                    variant={selectedSize === size ? "primary" : "secondary"}
                    onClick={() => setSelectedSize(size)}
                    size="small"
                    disabled={
                      isOrderView && selectedSize === size ? false : isOrderView
                    }
                  >
                    <Typography sx={{ fontSize: 14 }}>{size}</Typography>
                  </AppButton>
                ))}
              </Box>
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1">Quantity:</Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    overflow: "hidden",
                    width: "fit-content",
                  }}
                >
                  <>
                    {!isOrderView && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          setQuantity((prev) => Math.max(1, prev - 1))
                        }
                        sx={{
                          borderRight: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        −
                      </IconButton>
                    )}
                  </>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    size="small"
                    inputProps={{
                      min: 1,
                      max: 99,
                      style: { textAlign: "center", width: "60px" },
                    }}
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                    disabled={isOrderView}
                  />
                  <>
                    {!isOrderView && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          setQuantity((prev) => Math.min(99, prev + 1))
                        }
                        sx={{ borderLeft: "1px solid", borderColor: "divider" }}
                      >
                        +
                      </IconButton>
                    )}
                  </>
                </Box>
              </Box>
            </Box>

            <>
              {!isOrderView && (
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <AppButton variant="primary">Add to Cart</AppButton>
                  <AppButton variant="secondary">Buy Now</AppButton>
                </Box>
              )}
            </>
          </Box>

          {/* === Column 3: Delivery, Payment & Seller Info === */}
          <Box
            sx={{
              alignSelf: "flex-start",
              height: "fit-content",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Delivery & Payment Info
            </Typography>

            {/* Address dropdown */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Delivery Address:
              </Typography>
              <TextField
                select
                fullWidth
                label="Select Address"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                size="small"
              >
                {addresses.map((addr) => (
                  <MenuItem key={addr.value} value={addr.value}>
                    {addr.label}
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Delivery charges: $3 (Free on orders above $50)
              </Typography>
            </Box>

            {/* Payment Options */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Available Payment Methods:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {paymentOptions.map((method) => (
                  <AppButton key={method} variant="secondary" size="small">
                    {method}
                  </AppButton>
                ))}
              </Box>
            </Box>

            {/* Warranty and Brand Info */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Warranty & Returns:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                7-Day return policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1-year brand warranty included
              </Typography>
            </Box>

            {/* Seller Performance Info */}
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Seller Performance:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🚚 Ship on Time Rate: <strong>85%</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🌟 Positive Ratings: <strong>92%</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                💬 Response Rate: <strong>88%</strong>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ========== PRODUCT DETAILS SECTION ========== */}
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
          >
            Product Details
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {dummyProduct.details}
          </Typography>
        </Box>
      </Paper>

      {/* ========== RATINGS & REVIEWS SECTION ========== */}
      <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Ratings & Reviews
          </Typography>

          {/* Rating Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Rating</InputLabel>
            <Select
              value={filterRating}
              label="Filter by Rating"
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <MenuItem value="all">All Ratings</MenuItem>
              <MenuItem value="5">5 Stars</MenuItem>
              <MenuItem value="4">4 Stars</MenuItem>
              <MenuItem value="3">3 Stars</MenuItem>
              <MenuItem value="2">2 Stars</MenuItem>
              <MenuItem value="1">1 Star</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Rating Summary Row */}
        <Grid container spacing={3} alignItems="center">
          {/* Left: Average Rating */}
          <Grid sx={{ xs: 12, md: 4 }} textAlign="center">
            <Typography variant="h2" fontWeight="bold">
              4.6
              <Typography
                component="span"
                sx={{ fontSize: "1.25rem", color: "text.secondary" }}
              >
                /5
              </Typography>
            </Typography>
            <Rating value={4.6} precision={0.1} readOnly size="large" />
            <Typography variant="body2" color="text.secondary">
              301 Ratings
            </Typography>
          </Grid>

          {/* Right: Rating Bars */}
          {/* Right: Rating Bars */}
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            {[
              { stars: 5, count: 261 },
              { stars: 4, count: 7 },
              { stars: 3, count: 9 },
              { stars: 2, count: 9 },
              { stars: 1, count: 15 },
            ].map((item) => {
              const total = 301;
              const percent = (item.count / total) * 100;

              return (
                <Box
                  key={item.stars}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                    width: "25%",
                  }}
                >
                  {/* Replace star count with actual Rating component */}
                  <Rating
                    value={item.stars}
                    readOnly
                    size="small"
                    sx={{
                      color: "gold",
                      minWidth: 110, // keeps width consistent across rows
                    }}
                  />

                  {/* Progress bar */}
                  <Box
                    sx={{
                      flex: 1,
                      height: 8,
                      backgroundColor: "#e0e0e0",
                      borderRadius: 4,
                      overflow: "hidden",
                      minWidth: 120,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${percent}%`,
                        height: "100%",
                        backgroundColor: "#fbc02d",
                        borderRadius: 4,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      width: 40,
                      textAlign: "right",
                      color: "text.secondary",
                    }}
                  >
                    {item.count}
                  </Typography>
                </Box>
              );
            })}
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 4 }}>
          {filteredReviews.map((review, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {review.name}
                </Typography>
                {review.verified && (
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 1,
                      color: "green",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ✅ Verified Purchase
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{ ml: "auto", color: "text.secondary" }}
                >
                  {review.date}
                </Typography>
              </Box>

              <Rating value={review.rating} readOnly size="small" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.text}
              </Typography>

              {review.image && (
                <Box
                  component="img"
                  src={review.image}
                  alt="Review"
                  sx={{
                    mt: 1,
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
              )}

              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  👍 {review.likes}
                </Typography>
                <AppButton size="small" sx={{ textTransform: "none" }}>
                  Reply
                </AppButton>
              </Box>
            </Paper>
          ))}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Paper>
            <ProductStats />
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
