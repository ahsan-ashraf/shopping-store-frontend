import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
  Stack,
  Button,
  useTheme,
} from "@mui/material";

import AppInput from "../components/ui/app-input";
import type { OrderStatus } from "../types";

interface RiderOrder {
  id: string;
  address: string;
  phone: string;
  price: number;
  paymentType: "COD" | "Prepaid";
  status: OrderStatus;
  failureReason?: string;
}

const OrdersToDeliver = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState<RiderOrder[]>([
    {
      id: "ORD-12345",
      address: "45B Street 10, Gulshan-e-Iqbal, Karachi",
      phone: "0312-1234567",
      price: 3500,
      paymentType: "COD",
      status: "pending",
    },
    {
      id: "ORD-12346",
      address: "Apartment 8, Block A, Clifton, Karachi",
      phone: "0334-9988776",
      price: 1800,
      paymentType: "Prepaid",
      status: "inprogress",
    },
    {
      id: "ORD-12347",
      address: "House 221, Street 4, DHA Phase 2, Karachi",
      phone: "0321-5678901",
      price: 2800,
      paymentType: "COD",
      status: "delivered",
    },
  ]);

  // Sort orders: inprogress > pending > delivered
  const sortedOrders = [...orders].sort((a, b) => {
    const orderValue = (status: OrderStatus) =>
      status === "inprogress" ? 0 : status === "pending" ? 1 : 2;
    return orderValue(a.status) - orderValue(b.status);
  });

  const balanceToSubmit = orders
    .filter((o) => o.paymentType === "COD" && o.status === "delivered")
    .reduce((sum, o) => sum + o.price, 0);

  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  const handleStatusChange = (
    id: string,
    value: OrderStatus,
    reason?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: value,
              failureReason: value === "failed" ? reason : undefined,
            }
          : o
      )
    );
  };

  const handleRevert = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: "pending",
            }
          : o
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Balance Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={1}
      >
        <Typography variant="h5" fontWeight={600}>
          Orders to Deliver (Delivered: {deliveredCount} / Total:{" "}
          {orders.length})
        </Typography>
        <Chip
          label={`Balance to Submit: Rs. ${balanceToSubmit.toLocaleString()}`}
          color="primary"
          sx={{ fontWeight: 500, px: 2 }}
        />
      </Box>

      {/* Orders List */}
      <Stack spacing={3}>
        {sortedOrders.map((order) => (
          <Paper
            key={order.id}
            elevation={3}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid container spacing={2} alignItems="flex-start">
              {/* Order Info */}
              <Grid
                sx={{
                  xs: 12,
                  sm: 8,
                  maxWidth: { sm: "65%" }, // address max width
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Order ID:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {order.id}
                </Typography>

                <Box mt={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Address:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {order.address}
                  </Typography>
                </Box>

                <Box mt={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone:
                  </Typography>
                  <Typography variant="body2">{order.phone}</Typography>
                </Box>
              </Grid>

              {/* Payment / Status */}
              <Grid
                sx={{
                  xs: 12,
                  sm: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Type:
                </Typography>
                <Chip
                  label={order.paymentType}
                  color={order.paymentType === "COD" ? "warning" : "success"}
                  size="small"
                  sx={{ mt: 0.5, mb: 1, width: 0.5 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  Price:
                </Typography>
                <Typography variant="body1" fontWeight={600} mb={1}>
                  Rs. {order.price.toLocaleString()}
                </Typography>

                <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={order.status}
                    label="Status"
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as OrderStatus
                      )
                    }
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="inprogress">In Progress</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="failed">Delivery Failed</MenuItem>
                  </Select>
                </FormControl>

                {order.status === "failed" && (
                  <Box sx={{ mt: 1 }}>
                    <AppInput
                      fullWidth
                      size="small"
                      label="Failure Reason"
                      placeholder="Enter reason"
                      value={order.failureReason || ""}
                      onChange={(e) =>
                        handleStatusChange(order.id, "failed", e.target.value)
                      }
                    />
                  </Box>
                )}

                {/* Revert button for delivered orders */}
                {order.status === "delivered" && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ mt: 1, textTransform: "none" }}
                    onClick={() => handleRevert(order.id)}
                  >
                    Revert to Pending
                  </Button>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Footer: Status Chip */}
            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Chip
                label={order.status.toUpperCase()}
                color={
                  order.status === "delivered"
                    ? "success"
                    : order.status === "inprogress"
                    ? "info"
                    : order.status === "failed"
                    ? "error"
                    : "default"
                }
                variant="outlined"
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: { xs: 1, sm: 0 } }}
              >
                Last Updated: Just now
              </Typography>
            </Box>
          </Paper>
        ))}

        {orders.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            No orders assigned yet.
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default OrdersToDeliver;
