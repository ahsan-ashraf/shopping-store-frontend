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

export interface Admin {
  id: string;
  name: string;
  status: "Active" | "Blocked";
  createdAt: string;
}

export const SAMPLE_ADMINS: Admin[] = Array.from({ length: 5 }).map(
  (_, idx) => ({
    id: `A-${100 + idx}`,
    name: ["Super Admin", "Manager", "Operator", "Admin 1", "Admin 2"][idx],
    status: ["Active", "Blocked"][idx % 2] as Admin["status"],
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

const AdminsTable: React.FC = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Admin | "">("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [adminList, setAdminList] = useState<Admin[]>(SAMPLE_ADMINS);

  const handleRequestSort = (property: keyof Admin) => {
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
    setAdminList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Blocked" : "Active" }
          : a
      )
    );
  };

  const handleDelete = (id: string) =>
    setAdminList((prev) => prev.filter((a) => a.id !== id));

  const sortedAdmins = orderBy
    ? [...adminList].sort(getComparator(order, orderBy))
    : adminList;
  const paginatedAdmins = sortedAdmins.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Admins
      </Typography>
      <Paper sx={{ p: 1, mb: 3, maxHeight: 500, overflow: "auto" }}>
        {adminList.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: "center" }}>
            No data available
          </Typography>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table
                stickyHeader
                size="small"
                sx={{ tableLayout: "auto", minWidth: 600 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Admin ID</TableCell>
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
                  {paginatedAdmins.map((a) => (
                    <TableRow hover key={a.id}>
                      <TableCell>{a.id}</TableCell>
                      <TableCell>
                        <Link
                          to={AppRoutes.Profile}
                          style={{
                            textDecoration: "underline",
                            color: "inherit",
                          }}
                        >
                          {a.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={a.status}
                          color={a.status === "Active" ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(a.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleDelete(a.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleBlockUnblock(a.id)}
                          >
                            {a.status === "Active" ? "Block" : "Unblock"}
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
              count={adminList.length}
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

export default AdminsTable;
