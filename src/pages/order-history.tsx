import { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
} from "@mui/material";
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

const OrdersHistory = () => {
  const theme = useTheme();

  const [orders, setOrders] = useState<RiderOrder[]>([
    {
      id: "ORD-12345",
      address: "45B Street 10, Gulshan-e-Iqbal, Karachi",
      phone: "0312-1234567",
      price: 3500,
      paymentType: "COD",
      status: "delivered",
    },
    {
      id: "ORD-12346",
      address: "Apartment 8, Block A, Clifton, Karachi",
      phone: "0334-9988776",
      price: 1800,
      paymentType: "Prepaid",
      status: "failed",
      failureReason: "Customer not available",
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Order History
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Failure Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    maxWidth: 300,
                  }}
                >
                  {order.address}
                </TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>Rs. {order.price.toLocaleString()}</TableCell>
                <TableCell>
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
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {order.status === "failed" ? order.failureReason : ""}
                </TableCell>
              </TableRow>
            ))}

            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders in history.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrdersHistory;
