import React, { useState, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  images: string[];
  types: ("image" | "video")[];
  onDelete: (index: number) => void;
}

const ImagePreviewSlider: React.FC<Props> = ({ images, types, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const el = thumbsRef.current?.children[index] as HTMLElement;
    if (el)
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const selectItem = (index: number) => {
    setCurrentIndex(index);
    scrollToIndex(index);
  };

  // if current index gets removed, adjust
  React.useEffect(() => {
    if (currentIndex > images.length - 1) {
      setCurrentIndex(images.length - 1);
    }
  }, [images.length]);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {/* Main Preview */}
      <Box
        sx={{
          width: "100%",
          height: 300,
          border: "1px solid #ccc",
          borderRadius: 2,
          overflow: "hidden",
          mb: 2,
        }}
      >
        {types[currentIndex] === "video" ? (
          <video
            src={images[currentIndex]}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            autoPlay
            controls
          />
        ) : (
          <img
            src={images[currentIndex]}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>

      {/* Thumbnail Scroll Row */}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton size="small" onClick={handlePrev}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <div
            ref={thumbsRef}
            onWheelCapture={(e) => {
              const el = thumbsRef.current;
              if (!el) return;
              e.preventDefault();
              e.stopPropagation();
              el.scrollLeft += e.deltaY;
            }}
            style={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              gap: "8px",
              padding: "8px",
              whiteSpace: "nowrap",
            }}
          >
            {images.map((img, i) => (
              <div key={i} style={{ position: "relative", flexShrink: 0 }}>
                {/* delete btn */}
                <div
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onDelete(i);
                  }}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 12,
                    zIndex: 5,
                  }}
                >
                  ×
                </div>

                {/* thumb preview */}
                <div
                  onClick={() => selectItem(i)}
                  style={{
                    border:
                      currentIndex === i
                        ? "2px solid #1976d2"
                        : "2px solid transparent",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  {types[i] === "video" ? (
                    <video
                      src={img}
                      style={{
                        height: "70px",
                        width: "auto",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <img
                      src={img}
                      style={{
                        height: "70px",
                        width: "auto",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Box>

        <IconButton size="small" onClick={handleNext}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImagePreviewSlider;
