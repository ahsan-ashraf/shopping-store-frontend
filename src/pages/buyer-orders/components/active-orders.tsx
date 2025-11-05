import React from "react";
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
import type { Order } from "../../../types";

const mockActiveOrders: Order[] = [
  // Comment/Uncomment below for testing
  {
    id: "1",
    productImage: "/images/products/phone1.jpg",
    title: "Smartphone X100",
    description: "128GB, Midnight Black, Dual SIM",
    price: 85000,
    status: "processing",
    date: "2025-10-28",
    category: "Electronics",
  },
  {
    id: "2",
    productImage: "/images/products/headphones.jpg",
    title: "Noise Cancelling Headphones",
    description: "Bluetooth 5.3, 60hr battery, silver",
    price: 18500,
    status: "outForDelivery",
    date: "2025-11-02",
    category: "Audio",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "warning";
    case "packing":
      return "info";
    case "outForDelivery":
      return "primary";
    case "riderOnWay":
      return "secondary";
    case "delivered":
      return "success";
    default:
      return "default";
  }
};

const ActiveOrders: React.FC = () => {
  const navigate = useNavigate();
  const hasOrders = mockActiveOrders.length > 0;

  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Price (PKR)</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hasOrders ? (
            mockActiveOrders.map((order) => (
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
                  <Chip
                    label={order.status.replace(/([A-Z])/g, " $1")}
                    color={getStatusColor(order.status)}
                    size="small"
                    sx={{ textTransform: "capitalize" }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  py={5}
                >
                  <Typography variant="h6" gutterBottom>
                    You don’t have any active orders yet
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Start shopping to place your first order.
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

export default ActiveOrders;
