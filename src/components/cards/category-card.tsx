import React from "react";
import AppCard from "../ui/app-card";

interface CategoryCardProps {
  image: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  onClick,
  className,
}) => {
  return (
    <AppCard
      image={image}
      title={title}
      description="" // no description needed for category
      className={className}
      // Add cursor pointer to indicate click
      onClick={onClick ? onClick : undefined}
    />
  );
};

export default CategoryCard;
