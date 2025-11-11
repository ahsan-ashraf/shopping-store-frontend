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

export interface Seller {
  id: string;
  name: string;
  totalOrdersCompleted: number;
  totalOrdersCancelled: number;
  totalOrdersReturned: number;
  status: "Active" | "Blocked";
  createdAt: string;
}

export const SAMPLE_SELLERS: Seller[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: `S-${1000 + idx}`,
    name: ["Daily Mart", "Fresh Bites", "Techie Store", "Corner Shop"][idx % 4],
    totalOrdersCompleted: Math.floor(Math.random() * 200),
    totalOrdersCancelled: Math.floor(Math.random() * 20),
    totalOrdersReturned: Math.floor(Math.random() * 10),
    status: ["Active", "Blocked"][idx % 2] as Seller["status"],
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

const SellersTable: React.FC = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Seller | "">("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sellerList, setSellerList] = useState<Seller[]>(SAMPLE_SELLERS);

  const handleRequestSort = (property: keyof Seller) => {
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
    setSellerList((prev) =>
      prev.map((s) => {
        if (s.id === id)
          return { ...s, status: s.status === "Active" ? "Blocked" : "Active" };
        return s;
      })
    );
  };

  const handleDelete = (id: string) =>
    setSellerList((prev) => prev.filter((s) => s.id !== id));

  const sortedSellers = orderBy
    ? [...sellerList].sort(getComparator(order, orderBy))
    : sellerList;
  const paginatedSellers = sortedSellers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sellers
      </Typography>
      <Paper sx={{ p: 1, mb: 3, maxHeight: 500, overflow: "auto" }}>
        {sellerList.length === 0 ? (
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
                    <TableCell>Seller ID</TableCell>
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
                      sortDirection={
                        orderBy === "totalOrdersCompleted" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "totalOrdersCompleted"}
                        direction={
                          orderBy === "totalOrdersCompleted" ? order : "asc"
                        }
                        onClick={() =>
                          handleRequestSort("totalOrdersCompleted")
                        }
                      >
                        Orders Completed
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "totalOrdersCancelled" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "totalOrdersCancelled"}
                        direction={
                          orderBy === "totalOrdersCancelled" ? order : "asc"
                        }
                        onClick={() =>
                          handleRequestSort("totalOrdersCancelled")
                        }
                      >
                        Orders Cancelled
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "totalOrdersReturned" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "totalOrdersReturned"}
                        direction={
                          orderBy === "totalOrdersReturned" ? order : "asc"
                        }
                        onClick={() => handleRequestSort("totalOrdersReturned")}
                      >
                        Orders Returned
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
                  {paginatedSellers.map((s) => (
                    <TableRow hover key={s.id}>
                      <TableCell>{s.id}</TableCell>
                      <TableCell>
                        <Link
                          to={AppRoutes.Profile}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {s.name}
                        </Link>
                      </TableCell>
                      <TableCell>{s.totalOrdersCompleted}</TableCell>
                      <TableCell>{s.totalOrdersCancelled}</TableCell>
                      <TableCell>{s.totalOrdersReturned}</TableCell>
                      <TableCell>
                        <Chip
                          label={s.status}
                          color={s.status === "Active" ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(s.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleDelete(s.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleBlockUnblock(s.id)}
                          >
                            {s.status === "Active" ? "Block" : "Unblock"}
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
              count={sellerList.length}
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

export default SellersTable;
