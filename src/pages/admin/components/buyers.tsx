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
  Stack,
  Button,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routes-metadata";

export interface Buyer {
  id: string;
  name: string;
  totalOrders: number;
  totalCanceled: number;
  totalReturned: number;
  status: "Active" | "Blocked";
  createdAt: string;
}

export const SAMPLE_BUYERS: Buyer[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: `B-${1000 + idx}`,
    name: ["Ahsan Ali", "Sara Khan", "Bilal R.", "Maya"][idx % 4],
    totalOrders: Math.floor(Math.random() * 100),
    totalCanceled: Math.floor(Math.random() * 20),
    totalReturned: Math.floor(Math.random() * 10),
    status: ["Active", "Blocked"][idx % 2] as Buyer["status"],
    createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
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

const BuyersTable: React.FC = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Buyer | "">("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [buyerList, setBuyerList] = useState<Buyer[]>(SAMPLE_BUYERS);

  const handleRequestSort = (property: keyof Buyer) => {
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
    setBuyerList((prev) =>
      prev.map((b) => {
        if (b.id === id)
          return { ...b, status: b.status === "Active" ? "Blocked" : "Active" };
        return b;
      })
    );
  };

  const handleDelete = (id: string) =>
    setBuyerList((prev) => prev.filter((b) => b.id !== id));

  const sortedBuyers = orderBy
    ? [...buyerList].sort(getComparator(order, orderBy))
    : buyerList;
  const paginatedBuyers = sortedBuyers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Buyers
      </Typography>
      <Paper sx={{ p: 1, mb: 3, maxHeight: 500, overflow: "auto" }}>
        {buyerList.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: "center" }}>
            No data available
          </Typography>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table
                stickyHeader
                size="small"
                sx={{ tableLayout: "auto", minWidth: 900 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Buyer ID</TableCell>
                    <TableCell
                      sortDirection={orderBy === "name" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleRequestSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "totalOrders" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "totalOrders"}
                        direction={orderBy === "totalOrders" ? order : "asc"}
                        onClick={() => handleRequestSort("totalOrders")}
                      >
                        Total Orders
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "totalCanceled" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "totalCanceled"}
                        direction={orderBy === "totalCanceled" ? order : "asc"}
                        onClick={() => handleRequestSort("totalCanceled")}
                      >
                        Total Canceled
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "totalReturned" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "totalReturned"}
                        direction={orderBy === "totalReturned" ? order : "asc"}
                        onClick={() => handleRequestSort("totalReturned")}
                      >
                        Total Returned
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
                      sortDirection={orderBy === "createdAt" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "createdAt"}
                        direction={orderBy === "createdAt" ? order : "asc"}
                        onClick={() => handleRequestSort("createdAt")}
                      >
                        Created At
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedBuyers.map((b) => (
                    <TableRow hover key={b.id}>
                      <TableCell>{b.id}</TableCell>
                      <TableCell>
                        <Link
                          to={AppRoutes.Profile}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {b.name}
                        </Link>
                      </TableCell>
                      <TableCell>{b.totalOrders}</TableCell>
                      <TableCell>{b.totalCanceled}</TableCell>
                      <TableCell>{b.totalReturned}</TableCell>
                      <TableCell>
                        <Chip
                          label={b.status}
                          color={b.status === "Active" ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(b.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleDelete(b.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleBlockUnblock(b.id)}
                          >
                            {b.status === "Active" ? "Block" : "Unblock"}
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
              count={buyerList.length}
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

export default BuyersTable;
