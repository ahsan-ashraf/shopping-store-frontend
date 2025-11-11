import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
  Tooltip,
  Avatar,
  TableSortLabel,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/routes-metadata";
import type { Product } from "../../../types";

interface Props {
  data: Product[];
}

type Order = "asc" | "desc";

const StoreProducts: React.FC<Props> = ({ data }) => {
  const [productData, setProductData] = useState<Product[]>(data);
  const [orderBy, setOrderBy] = useState<keyof Product>("title");
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleAddProduct = () => navigate(AppRoutes.PublishProduct);
  const handleViewProduct = (id: string) => navigate(AppRoutes.ProductDetails);

  const handleSort = (column: keyof Product) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);

    const sorted = [...productData].sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return isAsc ? bVal - aVal : aVal - bVal;
      } else if (typeof aVal === "string" && typeof bVal === "string") {
        return isAsc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
      return 0;
    });
    setProductData(sorted);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">Store Products</Typography>
        <Button variant="contained" onClick={handleAddProduct}>
          Add New Product
        </Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell sortDirection={orderBy === "addedDate" ? order : false}>
              <TableSortLabel
                active={orderBy === "addedDate"}
                direction={orderBy === "addedDate" ? order : "asc"}
                onClick={() => handleSort("addedDate")}
              >
                Added Date
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "title" ? order : false}>
              <TableSortLabel
                active={orderBy === "title"}
                direction={orderBy === "title" ? order : "asc"}
                onClick={() => handleSort("title")}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "description" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "description"}
                direction={orderBy === "description" ? order : "asc"}
                onClick={() => handleSort("description")}
              >
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "price" ? order : false}>
              <TableSortLabel
                active={orderBy === "price"}
                direction={orderBy === "price" ? order : "asc"}
                onClick={() => handleSort("price")}
              >
                Price ($)
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "views" ? order : false}>
              <TableSortLabel
                active={orderBy === "views"}
                direction={orderBy === "views" ? order : "asc"}
                onClick={() => handleSort("views")}
              >
                Views
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "orders" ? order : false}>
              <TableSortLabel
                active={orderBy === "orders"}
                direction={orderBy === "orders" ? order : "asc"}
                onClick={() => handleSort("orders")}
              >
                Orders
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "cancelations" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "cancelations"}
                direction={orderBy === "cancelations" ? order : "asc"}
                onClick={() => handleSort("cancelations")}
              >
                Cancelations
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "returns" ? order : false}>
              <TableSortLabel
                active={orderBy === "returns"}
                direction={orderBy === "returns" ? order : "asc"}
                onClick={() => handleSort("returns")}
              >
                Returns
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "success" ? order : false}>
              <TableSortLabel
                active={orderBy === "success"}
                direction={orderBy === "success" ? order : "asc"}
                onClick={() => handleSort("success")}
              >
                Success
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {productData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => handleViewProduct(product.id)}
              >
                <TableCell>
                  <Avatar
                    src={product.image}
                    alt={product.title}
                    variant="rounded"
                  />
                </TableCell>
                <TableCell>{product.addedDate}</TableCell>
                <Tooltip title={product.title}>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.title}
                  </TableCell>
                </Tooltip>
                <Tooltip title={product.description}>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.description}
                  </TableCell>
                </Tooltip>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.views}</TableCell>
                <TableCell>{product.orders}</TableCell>
                <TableCell>{product.cancelations}</TableCell>
                <TableCell>{product.returns}</TableCell>
                <TableCell>{product.success}%</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(AppRoutes.ProductDetails);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Delete Product");
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={productData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows"
              sx={{
                "& .MuiTablePagination-toolbar": { justifyContent: "flex-end" },
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
};

export default StoreProducts;
