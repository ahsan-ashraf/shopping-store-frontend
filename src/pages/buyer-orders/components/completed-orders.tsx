import React, { useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import AppButton from "../../../components/ui/app-button";
import { useNavigate } from "react-router-dom";
import type { Order, SortOption } from "../../../types";

const mockCompletedOrders: Order[] = [
  {
    id: "1",
    productImage: "/images/products/laptop.jpg",
    title: "UltraBook Z13",
    description: "Intel i7 13th Gen, 16GB RAM, 1TB SSD",
    price: 225000,
    status: "delivered",
    date: "2025-10-15",
    category: "Electronics",
  },
  {
    id: "2",
    productImage: "/images/products/watch.jpg",
    title: "Smartwatch S5 Pro",
    description: "1.8-inch AMOLED, GPS, 10-day battery",
    price: 19500,
    status: "delivered",
    date: "2025-09-28",
    category: "Wearables",
  },
];

interface CompletedOrdersProps {
  sort: SortOption;
}

const CompletedOrders: React.FC<CompletedOrdersProps> = ({ sort }) => {
  const navigate = useNavigate();

  const sortedOrders = useMemo(() => {
    const orders = [...mockCompletedOrders];
    switch (sort) {
      case "latest":
        return orders.sort((a, b) => (a.date < b.date ? 1 : -1));
      case "oldest":
        return orders.sort((a, b) => (a.date > b.date ? 1 : -1));
      case "price_high":
        return orders.sort((a, b) => b.price - a.price);
      case "price_low":
        return orders.sort((a, b) => a.price - b.price);
      default:
        return orders;
    }
  }, [sort]);

  const hasOrders = sortedOrders.length > 0;

  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Price (PKR)</TableCell>
            <TableCell>Delivered On</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hasOrders ? (
            sortedOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ width: 80 }}>
                  <Box
                    component="img"
                    src={order.productImage}
                    alt={order.title}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                </TableCell>

                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: 500,
                    }}
                  >
                    {order.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {order.description}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="subtitle2">
                    Rs. {order.price.toLocaleString()}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.date).toLocaleDateString("en-PK", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label="Delivered"
                    color="success"
                    size="small"
                    sx={{ textTransform: "capitalize" }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  py={5}
                >
                  <Typography variant="h6" gutterBottom>
                    No completed orders found
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Once your orders are delivered, they’ll appear here.
                  </Typography>
                  <AppButton variant="primary" onClick={() => navigate("/")}>
                    Continue Shopping
                  </AppButton>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompletedOrders;
