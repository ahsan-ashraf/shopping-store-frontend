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

export interface Rider {
  id: string;
  name: string;
  totalDeliveries: number;
  totalFailures: number;
  status: "Active" | "Blocked";
  createdAt: string;
  amountToReceive: number; // NEW FIELD
}

export const SAMPLE_RIDERS: Rider[] = Array.from({ length: 10 }).map(
  (_, idx) => {
    // Randomly decide if the rider has an amount or not
    const randomAmount =
      Math.random() > 0.2 ? Math.floor(Math.random() * 5000) : 0;
    return {
      id: `R-${1000 + idx}`,
      name: ["Ahsan Ali", "Sara Khan", "Bilal R.", "Maya"][idx % 4],
      totalDeliveries: Math.floor(Math.random() * 200),
      totalFailures: Math.floor(Math.random() * 20),
      status: ["Active", "Blocked"][idx % 2] as Rider["status"],
      createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
      amountToReceive: randomAmount, // 0 if no amount
    };
  }
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

const RidersTable: React.FC = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Rider | "">("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [riderList, setRiderList] = useState<Rider[]>(SAMPLE_RIDERS);

  const handleRequestSort = (property: keyof Rider) => {
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
    setRiderList((prev) =>
      prev.map((r) => {
        if (r.id === id)
          return { ...r, status: r.status === "Active" ? "Blocked" : "Active" };
        return r;
      })
    );
  };

  const handleDelete = (id: string) =>
    setRiderList((prev) => prev.filter((r) => r.id !== id));

  const sortedRiders = orderBy
    ? [...riderList].sort(getComparator(order, orderBy))
    : riderList;
  const paginatedRiders = sortedRiders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Riders
      </Typography>
      <Paper sx={{ p: 1, mb: 3, maxHeight: 500, overflow: "auto" }}>
        {riderList.length === 0 ? (
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
                    <TableCell>Rider ID</TableCell>
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
                        orderBy === "totalDeliveries" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "totalDeliveries"}
                        direction={
                          orderBy === "totalDeliveries" ? order : "asc"
                        }
                        onClick={() => handleRequestSort("totalDeliveries")}
                      >
                        Total Deliveries
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "totalFailures" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "totalFailures"}
                        direction={orderBy === "totalFailures" ? order : "asc"}
                        onClick={() => handleRequestSort("totalFailures")}
                      >
                        Total Delivery Failures
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
                    <TableCell>Amount to Receive</TableCell> {/* NEW */}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedRiders.map((r) => (
                    <TableRow hover key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>
                        <Link
                          to={AppRoutes.Profile}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {r.name}
                        </Link>
                      </TableCell>
                      <TableCell>{r.totalDeliveries}</TableCell>
                      <TableCell>{r.totalFailures}</TableCell>
                      <TableCell>
                        <Chip
                          label={r.status}
                          color={r.status === "Active" ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{r.amountToReceive}</TableCell> {/* NEW */}
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleDelete(r.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleBlockUnblock(r.id)}
                          >
                            {r.status === "Active" ? "Block" : "Unblock"}
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() =>
                              setRiderList((prev) =>
                                prev.map((rider) =>
                                  rider.id === r.id
                                    ? { ...rider, amountToReceive: 0 }
                                    : rider
                                )
                              )
                            }
                          >
                            Settle Amount
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
              count={riderList.length}
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

export default RidersTable;
