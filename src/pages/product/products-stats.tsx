import React, { useState, useMemo } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

// --- Types ---
interface Stat {
  date: string;
  impressions: number;
  views: number;
  ordersPlaced: number;
  ordersCanceled: number;
  orderSuccessRate: string; // e.g., "88%"
  returnRate: string; // e.g., "4%"
}

type Order = keyof Stat;

// --- Generate 2 months of dummy data ---
const generateDummyStats = (): Stat[] => {
  const stats: Stat[] = [];
  let currentDate = dayjs().subtract(60, "day");
  for (let i = 0; i < 60; i++) {
    const impressions = Math.floor(Math.random() * 2000 + 500);
    const views = Math.floor(impressions * (0.5 + Math.random() * 0.5));
    const ordersPlaced = Math.floor(views * (0.05 + Math.random() * 0.1));
    const ordersCanceled = Math.floor(ordersPlaced * Math.random() * 0.2);
    const orderSuccessRate = `${Math.round(
      ((ordersPlaced - ordersCanceled) / ordersPlaced) * 100
    )}%`;
    const returnRate = `${Math.round(Math.random() * 5)}%`;
    stats.push({
      date: currentDate.format("YYYY-MM-DD"),
      impressions,
      views,
      ordersPlaced,
      ordersCanceled,
      orderSuccessRate,
      returnRate,
    });
    currentDate = currentDate.add(1, "day");
  }
  return stats;
};

const dummyStats: Stat[] = generateDummyStats();

// --- Component ---
const ProductStats: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [sortBy, setSortBy] = useState<Order | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (column: Order): void => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  };

  const handleClearFilters = (): void => {
    setStartDate("");
    setEndDate("");
    setSortBy(null);
    setSortDir("asc");
  };

  const filteredStats: Stat[] = useMemo(() => {
    let data = dummyStats.filter(
      (s) =>
        (!startDate || s.date >= startDate) && (!endDate || s.date <= endDate)
    );

    if (sortBy) {
      data = data.sort((a, b) => {
        let aValue: string | number = a[sortBy];
        let bValue: string | number = b[sortBy];

        if (typeof aValue === "string" && aValue.includes("%")) {
          aValue = parseInt(aValue.replace("%", ""), 10);
          bValue = parseInt((bValue as string).replace("%", ""), 10);
        }

        if (aValue < bValue) return sortDir === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [startDate, endDate, sortBy, sortDir]);

  const tableColumns: { label: string; key: Order }[] = [
    { label: "Date", key: "date" },
    { label: "Impressions", key: "impressions" },
    { label: "Views", key: "views" },
    { label: "Orders Placed", key: "ordersPlaced" },
    { label: "Orders Canceled", key: "ordersCanceled" },
    { label: "Order Success Rate", key: "orderSuccessRate" },
    { label: "Return Rate", key: "returnRate" },
  ];

  return (
    <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Product Performance Stats
        </Typography>

        <Button variant="outlined" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Box>

      {/* Date Filter */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Stats Table */}
      <Table>
        <TableHead>
          <TableRow>
            {tableColumns.map((col) => (
              <TableCell key={col.key}>
                <TableSortLabel
                  active={sortBy === col.key}
                  direction={sortDir}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredStats.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableColumns.length} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            filteredStats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell>{stat.date}</TableCell>
                <TableCell>{stat.impressions}</TableCell>
                <TableCell>{stat.views}</TableCell>
                <TableCell>{stat.ordersPlaced}</TableCell>
                <TableCell>{stat.ordersCanceled}</TableCell>
                <TableCell>{stat.orderSuccessRate}</TableCell>
                <TableCell>{stat.returnRate}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProductStats;
