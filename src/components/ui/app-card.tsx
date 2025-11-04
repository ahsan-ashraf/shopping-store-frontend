import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { cn } from "../../utils/utils";

interface AppCardProps {
  image: string;
  title: string;
  description?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode; // allow children
}

const AppCard: React.FC<AppCardProps> = ({
  image,
  title,
  description,
  className,
  onClick,
  children,
}) => {
  return (
    <Card
      onClick={onClick}
      className={cn("rounded-2xl overflow-hidden", className)}
      sx={{
        boxShadow: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        className="object-cover w-full"
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: 80,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {description}
          </Typography>
        )}

        {/* render any children passed from specialized cards */}
        {children}
      </CardContent>
    </Card>
  );
};

export default AppCard;
