import React from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import AppButton from "../../../components/ui/app-button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import type { Address } from "../../../types";

interface Props {
  addresses: Address[];
  onEdit: (addressToEdit: Address) => void;
  onDelete: (addressToDelete: Address) => void;
  onAdd: () => void;
}

const AddressBookSection: React.FC<Props> = ({
  addresses,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 3, borderRadius: 2, mt: 3, position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Address Book</Typography>
        <AppButton variant="primary" onClick={onAdd}>
          Add New Address
        </AppButton>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Default</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell sx={{ maxWidth: 350 }}>
                <Typography variant="body2">
                  {a.addressLine1}
                  {a.addressLine2 ? `, ${a.addressLine2}` : ""}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.city}
                  {a.province ? `, ${a.province}` : ""}
                </Typography>
              </TableCell>
              <TableCell>{a.postalCode}</TableCell>
              <TableCell>{a.phone}</TableCell>
              <TableCell>
                {a.isDefault ? (
                  <Typography variant="body2" color="text.secondary">
                    Default Shipping Address
                  </Typography>
                ) : null}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(a)} aria-label="edit-address">
                  <EditIcon sx={{ color: `${theme.palette.primary.main}` }} />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(a)}
                  aria-label="delete-address"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AddressBookSection;
