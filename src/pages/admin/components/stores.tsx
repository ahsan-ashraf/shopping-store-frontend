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
  Chip,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routes-metadata";

export interface Store {
  id: string;
  name: string;
  seller: string;
  createdAt: string;
  status: "Active" | "Blocked" | "Pending Approval";
  ordersCompleted: number;
  avgRating: number;
  ordersCanceled: number;
  ordersReturned: number;
  lastActivity: string;
}

interface StoresTableProps {
  stores?: Store[];
}

export const SAMPLE_STORES: Store[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: `ST-${1000 + idx}`,
    name: ["Daily Mart", "Fresh Bites", "Techie Store", "Corner Shop"][idx % 4],
    seller: ["Ahsan Ali", "Sara Khan", "Bilal R.", "Maya"][idx % 4],
    createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
    status: ["Active", "Blocked", "Pending Approval"][
      idx % 3
    ] as Store["status"],
    ordersCompleted: Math.floor(Math.random() * 1000),
    avgRating: parseFloat((Math.random() * 5).toFixed(1)),
    ordersCanceled: Math.floor(Math.random() * 50),
    ordersReturned: Math.floor(Math.random() * 30),
    lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(),
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

const StoresTable: React.FC<StoresTableProps> = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Store | "">("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [storeList, setStoreList] = useState<Store[]>(SAMPLE_STORES);

  const handleRequestSort = (property: keyof Store) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBlockUnblock = (id: string) => {
    setStoreList((prev) =>
      prev.map((store) => {
        if (store.id === id) {
          if (store.status === "Active") return { ...store, status: "Blocked" };
          if (store.status === "Blocked") return { ...store, status: "Active" };
        }
        return store;
      })
    );
  };

  const handleDelete = (id: string) => {
    setStoreList((prev) => prev.filter((store) => store.id !== id));
  };

  const handleApprove = (id: string) => {
    setStoreList((prev) =>
      prev.map((store) =>
        store.id === id ? { ...store, status: "Active" } : store
      )
    );
  };

  const sortedStores = orderBy
    ? [...storeList].sort(getComparator(order, orderBy))
    : storeList;
  const paginatedStores = sortedStores.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Stores
      </Typography>
      <Paper sx={{ p: 1, mb: 3, maxHeight: 500, overflow: "auto" }}>
        {storeList.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: "center" }}>
            No data available
          </Typography>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table
                stickyHeader
                size="small"
                sx={{ tableLayout: "auto", minWidth: 1200 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Store ID</TableCell>
                    <TableCell
                      sortDirection={orderBy === "name" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleRequestSort("name")}
                      >
                        Store Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "seller" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "seller"}
                        direction={orderBy === "seller" ? order : "asc"}
                        onClick={() => handleRequestSort("seller")}
                      >
                        Seller Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "createdAt" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "createdAt"}
                        direction={orderBy === "createdAt" ? order : "asc"}
                        onClick={() => handleRequestSort("createdAt")}
                      >
                        Created Date
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
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "ordersCompleted" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "ordersCompleted"}
                        direction={
                          orderBy === "ordersCompleted" ? order : "asc"
                        }
                        onClick={() => handleRequestSort("ordersCompleted")}
                      >
                        Orders Completed
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "avgRating" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "avgRating"}
                        direction={orderBy === "avgRating" ? order : "asc"}
                        onClick={() => handleRequestSort("avgRating")}
                      >
                        Avg Rating
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "ordersCanceled" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "ordersCanceled"}
                        direction={orderBy === "ordersCanceled" ? order : "asc"}
                        onClick={() => handleRequestSort("ordersCanceled")}
                      >
                        Orders Canceled
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "ordersReturned" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "ordersReturned"}
                        direction={orderBy === "ordersReturned" ? order : "asc"}
                        onClick={() => handleRequestSort("ordersReturned")}
                      >
                        Orders Returned
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "lastActivity" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "lastActivity"}
                        direction={orderBy === "lastActivity" ? order : "asc"}
                        onClick={() => handleRequestSort("lastActivity")}
                      >
                        Last Activity
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedStores.map((store) => (
                    <TableRow hover key={store.id}>
                      <TableCell>{store.id}</TableCell>
                      <TableCell>
                        <Link
                          to={AppRoutes.StoreDetails}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {store.name}
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
                          {store.seller}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {new Date(store.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={store.status}
                          size="small"
                          color={
                            store.status === "Active"
                              ? "success"
                              : store.status === "Blocked"
                              ? "error"
                              : "warning"
                          }
                        />
                      </TableCell>
                      <TableCell>{store.ordersCompleted}</TableCell>
                      <TableCell>{store.avgRating}</TableCell>
                      <TableCell>{store.ordersCanceled}</TableCell>
                      <TableCell>{store.ordersReturned}</TableCell>
                      <TableCell>
                        {new Date(store.lastActivity).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {store.status === "Pending Approval" && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleApprove(store.id)}
                            >
                              Approve
                            </Button>
                          )}
                          {store.status === "Active" && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleBlockUnblock(store.id)}
                            >
                              Block
                            </Button>
                          )}
                          {store.status === "Blocked" && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleBlockUnblock(store.id)}
                            >
                              Unblock
                            </Button>
                          )}
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleDelete(store.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={storeList.length}
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
};

export default StoresTable;
