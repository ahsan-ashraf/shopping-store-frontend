import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  TablePagination,
  Box,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routes-metadata";

interface Order {
  id: string;
  buyer: string;
  store: string;
  status: "Pending" | "In Transit" | "Delivered" | "Failed" | "Cancelled";
  amount: number;
  date: string;
}

interface RecentOrdersTableProps {
  orders?: Order[];
}

export const SAMPLE_ORDERS: Order[] = Array.from({ length: 15 }).map(
  (_, idx) => ({
    id: `ORD-${202500 + idx}`,
    buyer: ["Ahsan Ali", "Sara Khan", "Bilal R.", "Maya"][idx % 4],
    store: ["Daily Mart", "Fresh Bites", "Techie Store", "Corner Shop"][
      idx % 4
    ],
    status: ["Pending", "In Transit", "Delivered", "Failed", "Cancelled"][
      idx % 5
    ] as Order["status"],
    amount: Math.round(Math.random() * 5000) + 200,
    date: new Date(Date.now() - idx * 1000 * 60 * 60 * 24).toISOString(),
  })
);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
) {
  return order === "desc"
    ? (a: { [key in Key]: any }, b: { [key in Key]: any }) =>
        descendingComparator(a, b, orderBy)
    : (a: { [key in Key]: any }, b: { [key in Key]: any }) =>
        -descendingComparator(a, b, orderBy);
}

export default function RecentOrdersTable({
  orders = SAMPLE_ORDERS,
}: RecentOrdersTableProps) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Order | "">("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: keyof Order) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedOrders = orderBy
    ? [...orders].sort(getComparator(order, orderBy))
    : orders;

  const paginatedOrders = sortedOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Orders
      </Typography>
      <Paper sx={{ p: 1, mb: 3, maxHeight: 500 }}>
        {orders.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography>No data available</Typography>
          </Box>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell
                      sortDirection={orderBy === "buyer" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "buyer"}
                        direction={orderBy === "buyer" ? order : "asc"}
                        onClick={() => handleRequestSort("buyer")}
                      >
                        Buyer Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "store" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "store"}
                        direction={orderBy === "store" ? order : "asc"}
                        onClick={() => handleRequestSort("store")}
                      >
                        Store Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "status" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "status"}
                        direction={orderBy === "status" ? order : "asc"}
                        onClick={() => handleRequestSort("status")}
                      >
                        Order Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "amount" ? order : false}
                      align="right"
                    >
                      <TableSortLabel
                        active={orderBy === "amount"}
                        direction={orderBy === "amount" ? order : "asc"}
                        onClick={() => handleRequestSort("amount")}
                      >
                        Amount
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "date" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "date"}
                        direction={orderBy === "date" ? order : "asc"}
                        onClick={() => handleRequestSort("date")}
                      >
                        Date
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedOrders.map((o) => (
                    <TableRow hover key={o.id}>
                      <TableCell>
                        <Link
                          to={AppRoutes.OrderDetails}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {o.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={AppRoutes.Profile}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {o.buyer}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={AppRoutes.StoreDetails}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {o.store}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={o.status}
                          size="small"
                          color={
                            o.status === "Delivered"
                              ? "success"
                              : o.status === "Failed" ||
                                o.status === "Cancelled"
                              ? "error"
                              : "info"
                          }
                        />
                      </TableCell>
                      <TableCell align="right">{o.amount}</TableCell>
                      <TableCell>
                        {new Date(o.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={orders.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Rows"
            />
          </>
        )}
      </Paper>
    </>
  );
}
