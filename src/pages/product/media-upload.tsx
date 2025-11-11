import React, { useState, type ChangeEvent, type DragEvent } from "react";
import { Box, Typography } from "@mui/material";
import ImagePreviewSlider from "../../components/ui/image-preview-slider";

interface MediaUploadProps {
  images: File[];
  setImages: (files: File[]) => void;
  maxImages?: number;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  images,
  setImages,
  maxImages = 50,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (filesArray: File[]) => {
    // enforce only 1 video
    if (filesArray.some((f) => f.type.startsWith("video"))) {
      if (images.some((f) => f.type.startsWith("video"))) {
        alert("You can only upload 1 video.");
        return;
      }
    }

    const totalFiles = images.length + filesArray.length;
    if (totalFiles > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }
    setImages([...images, ...filesArray]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFiles(Array.from(e.target.files));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleDelete = (idx: number) => {
    const newImages = [...images];
    newImages.splice(idx, 1);
    setImages(newImages);
  };

  // convert and reorder: video always index 0
  const fileObjects = images.map((file) => ({
    url: URL.createObjectURL(file),
    type: file.type.startsWith("video") ? "video" : "image",
  }));

  fileObjects.sort((a, _) => (a.type === "video" ? -1 : 1));

  const urls = fileObjects.map((f) => f.url);
  const types = fileObjects.map((f) => f.type as "video" | "image");

  return (
    <Box sx={{ mb: 3, maxWidth: 500 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Product Media
      </Typography>

      {images.length > 0 && (
        <ImagePreviewSlider
          images={urls}
          types={types}
          onDelete={handleDelete}
        />
      )}

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.400",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          mb: 2,
          mt: 3,
          cursor: "pointer",
        }}
      >
        <Typography>
          Drag & drop images/videos here, or click to select files
        </Typography>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleImageChange}
          style={{ display: "block", marginTop: 10 }}
        />
      </Box>

      {images.length === 0 && (
        <Typography color="error">
          At least 1 media file is required.
        </Typography>
      )}
    </Box>
  );
};

export default MediaUpload;
