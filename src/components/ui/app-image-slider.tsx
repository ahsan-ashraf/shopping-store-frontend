import React, { useEffect, useState } from "react";
import { Box, IconButton, Fade, useMediaQuery, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight, Circle } from "@mui/icons-material";

export interface AppImageSliderProps {
  images: { url: string; alt?: string }[];
  interval?: number; // autoplay interval (ms)
  showArrows?: boolean;
  showDots?: boolean;
  height?: number | string;
  borderRadius?: number;
}

const AppImageSlider: React.FC<AppImageSliderProps> = ({
  images,
  interval = 4000,
  showArrows = true,
  showDots = true,
  height = 350,
  borderRadius = 0,
}) => {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // 👈 detect small screens

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const auto = setInterval(nextSlide, interval);
    return () => clearInterval(auto);
  }, [interval, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius,
        boxShadow: 2,
      }}
    >
      {images.map((img, index) => (
        <Fade in={index === current} timeout={700} key={index} unmountOnExit>
          <Box
            component="img"
            src={img.url}
            alt={img.alt ?? `slide-${index}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              transition: "opacity 0.7s ease-in-out",
            }}
          />
        </Fade>
      ))}

      {/* 👇 Hide arrows completely on small screens */}
      {showArrows && !isSmallScreen && (
        <>
          <IconButton
            onClick={prevSlide}
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.4)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            }}
          >
            <ChevronLeft sx={{ fontSize: 30 }} />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.4)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            }}
          >
            <ChevronRight sx={{ fontSize: 30 }} />
          </IconButton>
        </>
      )}

      {showDots && (
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {images.map((_, i) => (
            <Circle
              key={i}
              onClick={() => setCurrent(i)}
              sx={{
                fontSize: 10,
                cursor: "pointer",
                color: i === current ? "primary.main" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AppImageSlider;
