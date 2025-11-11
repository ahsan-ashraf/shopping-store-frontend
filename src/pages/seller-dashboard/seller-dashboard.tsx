import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UndoIcon from "@mui/icons-material/Undo";
import CancelIcon from "@mui/icons-material/Cancel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AppButton from "../../components/ui/app-button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routes-metadata";
import SellerStoresSection from "../profile/components/seller-store-section";

interface Order {
  id: string;
  storeName: string;
  customerName: string;
  status:
    | "processing"
    | "pending"
    | "packing"
    | "outForDelivery"
    | "riderOnWay"
    | "delivered"
    | "returned"
    | "canceled";
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    storeName: "ElectroShop",
    customerName: "John Doe",
    status: "processing",
  },
  {
    id: "ORD002",
    storeName: "Fashion Hub",
    customerName: "Jane Smith",
    status: "pending",
  },
  {
    id: "ORD003",
    storeName: "Gadget World",
    customerName: "Alice Johnson",
    status: "riderOnWay",
  },
];
const mockStores = [
  {
    id: "1",
    name: "Gadget Galaxy",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "2",
    name: "Tech Haven",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: "3",
    name: "Urban Style Hub",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
];
const handleSelectStore = (storeId: string) => {
  console.log("Go to store:", storeId);
  // navigate(`/seller/store/${storeId}`);
};

const handleCreateStore = () => {
  console.log("Redirect to create store page");
  // navigate("/seller/store/create");
};
const SellerDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const navigate = useNavigate();
  const handleStatusChange = (id: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };
  const viewOrderDetails = () => {
    navigate(AppRoutes.OrderDetails); // your route path
  };

  const highlights = [
    {
      label: "Total Stores",
      value: 5,
      icon: <StoreIcon fontSize="large" color="primary" />,
    },
    {
      label: "Total Products",
      value: 120,
      icon: <Inventory2Icon fontSize="large" color="primary" />,
    },
    {
      label: "Total Orders",
      value: 350,
      icon: <ShoppingCartIcon fontSize="large" color="primary" />,
    },
    {
      label: "Total Returns",
      value: 12,
      icon: <UndoIcon fontSize="large" color="error" />,
    },
    {
      label: "Total Cancellations",
      value: 8,
      icon: <CancelIcon fontSize="large" color="error" />,
    },
    {
      label: "Total Revenue",
      value: "$45,600",
      icon: <MonetizationOnIcon fontSize="large" color="success" />,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Section Heading */}
      <Typography variant="h5" mb={2}>
        Dashboard
      </Typography>

      {/* Top Highlights */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2} mb={3}>
          {highlights.map((item) => (
            <Grid sx={{ xs: 6, sm: 4, md: 2 }} key={item.label}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Stack spacing={1} alignItems="center">
                  {item.icon}
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h6">{item.value}</Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Orders Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Recent Orders
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Store Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.storeName}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e: SelectChangeEvent) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as Order["status"]
                      )
                    }
                    size="small"
                  >
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="packing">Packing</MenuItem>
                    <MenuItem value="outForDelivery">Out For Delivery</MenuItem>
                    <MenuItem value="riderOnWay">Rider On Way</MenuItem>
                    <MenuItem value="canceled">Canceled</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <AppButton
                    variant="primary"
                    size="small"
                    onClick={viewOrderDetails}
                  >
                    View
                  </AppButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <SellerStoresSection
        stores={mockStores}
        onSelectStore={handleSelectStore}
        onCreateStore={handleCreateStore}
      />
    </Container>
  );
};

export default SellerDashboard;
