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
import type { Order } from "../../../types";
import { useNavigate } from "react-router-dom";

interface OrderTableWithReasonProps {
  orders: (Order & { reason?: string; initiatedBy?: string })[];
  showReason?: boolean;
  emptyMessage: string;
  emptyActionLabel?: string;
  onEmptyActionClick?: () => void;
}

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
    case "returned":
      return "error";
    case "canceled":
      return "error";
    default:
      return "default";
  }
};

const OrderTableWithReason: React.FC<OrderTableWithReasonProps> = ({
  orders,
  showReason = false,
  emptyMessage,
  emptyActionLabel,
  onEmptyActionClick,
}) => {
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {emptyMessage}
        </Typography>
        {emptyActionLabel && (
          <AppButton
            onClick={onEmptyActionClick || (() => navigate("/"))}
            size="small"
          >
            {emptyActionLabel}
          </AppButton>
        )}
      </Paper>
    );
  }

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
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <TableRow hover>
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

              {showReason && order.reason && (
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: "background.paper" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", ml: 2 }}
                    >
                      <strong>Reason:</strong> {order.reason}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTableWithReason;
