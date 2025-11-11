import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  TableFooter,
  TablePagination,
} from "@mui/material";
import type { StoreStats } from "../../../types";

interface Props {
  storeData: StoreStats[];
}

type Order = "asc" | "desc";

const StoreStatistics: React.FC<Props> = ({ storeData }) => {
  const [orderBy, setOrderBy] = useState<keyof StoreStats>("date");
  const [order, setOrder] = useState<Order>("desc");

  // Pagination states
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleSort = (column: keyof StoreStats): void => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedStats = useMemo(() => {
    return [...storeData].sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];

      // Numbers
      if (typeof valA === "number" && typeof valB === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      }

      // Date
      if (orderBy === "date") {
        return order === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      // Strings (fallback)
      if (typeof valA === "string" && typeof valB === "string") {
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });
  }, [storeData, orderBy, order]);

  // Paginate the sorted data
  const paginatedStats = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedStats.slice(start, start + rowsPerPage);
  }, [sortedStats, page, rowsPerPage]);

  return (
    <Box>
      {/* Stats Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Store Statistics (Last 30 Days)
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { label: "Date", key: "date" },
                { label: "Impressions", key: "impressions" },
                { label: "Views", key: "views" },
                { label: "Orders", key: "orders" },
                { label: "Cancelation Rate", key: "cancelRate" },
                { label: "Success Rate", key: "successRate" },
                { label: "Return Rate", key: "returnRate" },
              ].map((col) => (
                <TableCell key={col.key}>
                  <TableSortLabel
                    active={orderBy === col.key}
                    direction={orderBy === col.key ? order : "asc"}
                    onClick={() => handleSort(col.key as keyof StoreStats)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStats.length > 0 ? (
              paginatedStats.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.impressions}</TableCell>
                  <TableCell>{row.views}</TableCell>
                  <TableCell>{row.orders}</TableCell>
                  <TableCell>{row.cancelRate}</TableCell>
                  <TableCell>{row.successRate}</TableCell>
                  <TableCell>{row.returnRate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={sortedStats.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page"
                sx={{
                  "& .MuiTablePagination-toolbar": {
                    justifyContent: "flex-end",
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Box>
  );
};

export default StoreStatistics;
