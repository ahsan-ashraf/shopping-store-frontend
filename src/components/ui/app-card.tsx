import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { cn } from "../../utils/utils";

interface AppCardProps {
  image: string;
  title: string;
  description?: string;
  price?: string | number;
  className?: string;
  onClick?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({
  image,
  title,
  description,
  price,
  className,
}) => {
  return (
    <Card
      className={cn(
        "rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden",
        className
      )}
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
          height: "calc(100% - 140px)", // remaining height for content
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap", // single line truncation
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {description}
          </Typography>
        )}
        {price && (
          <Typography
            variant="subtitle1"
            color="primary"
            className="mt-2 font-semibold"
          >
            ${price}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AppCard;
