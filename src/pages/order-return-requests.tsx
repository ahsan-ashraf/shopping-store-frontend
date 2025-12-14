import { useState } from "react";
import { Box, Container, Typography, Paper, Grid, Select, MenuItem, FormControl, InputLabel, Chip, Divider, Stack, Button, useTheme } from "@mui/material";

import type { ReturnStatus } from "../types";

interface ReturnOrder {
  id: string;
  address: string;
  phone: string;
  price: number;
  status: ReturnStatus;
}

const OrderReturnRequests = () => {
  const theme = useTheme();

  // Section A: Returns to receive (active)
  const [returnsToReceive, setReturnsToReceive] = useState<ReturnOrder[]>([
    {
      id: "RET-99101",
      address: "House 88, Block D, North Nazimabad, Karachi",
      phone: "0301-5678902",
      price: 2500,
      status: "pending"
    },
    {
      id: "RET-99102",
      address: "Flat 12, Block 3, Gulshan-e-Maymar, Karachi",
      phone: "0320-1239988",
      price: 1900,
      status: "inprogress"
    }
  ]);

  // Section B: Returns received (awaiting store confirmation)
  const [returnsReceived, setReturnsReceived] = useState<ReturnOrder[]>([
    {
      id: "RET-99001",
      address:
        "Street 10, Phase 4, DHA, Karachi Street 10, Phase 4, DHA, Karachi Street 10, Phase 4, DHA, Karachi Street 10, Phase 4, DHA, Karachi Street 10, Phase 4, DHA, Karachi Street 10, Phase 4, DHA, Karachi",
      phone: "0333-9876543",
      price: 2800,
      status: "awaiting_store"
    }
  ]);

  const handleStatusChange = (id: string, value: ReturnStatus) => {
    setReturnsToReceive((prev) => prev.map((r) => (r.id === id ? { ...r, status: value } : r)));

    if (value === "completed") {
      const completed = returnsToReceive.find((r) => r.id === id);
      if (completed) {
        setReturnsToReceive((prev) => prev.filter((r) => r.id !== id));
        setReturnsReceived((prev) => [...prev, { ...completed, status: "awaiting_store" }]);
      }
    }
  };

  const handleRevert = (id: string) => {
    const reverted = returnsReceived.find((r) => r.id === id);
    if (reverted) {
      setReturnsReceived((prev) => prev.filter((r) => r.id !== id));
      setReturnsToReceive((prev) => [...prev, { ...reverted, status: "pending" }]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Return Orders
      </Typography>

      {/* Section A: Returns to Receive */}
      <Box mb={5}>
        <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
          Returns to Receive
        </Typography>

        <Stack spacing={3}>
          {returnsToReceive.map((r) => (
            <Paper
              key={r.id}
              elevation={3}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Grid container spacing={2} alignItems="flex-start">
                {/* Left side: Return info */}
                <Grid
                  sx={{
                    xs: 12,
                    sm: 8,
                    maxWidth: { sm: "65%" }
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Return ID:
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {r.id}
                  </Typography>

                  <Box mt={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflowWrap: "break-word"
                      }}
                    >
                      {r.address}
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone:
                    </Typography>
                    <Typography variant="body2">{r.phone}</Typography>
                  </Box>
                </Grid>

                {/* Right side: Actions */}
                <Grid
                  sx={{
                    xs: 12,
                    sm: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Price:
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    Rs. {r.price.toLocaleString()}
                  </Typography>

                  <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={r.status} label="Status" onChange={(e) => handleStatusChange(r.id, e.target.value as ReturnStatus)}>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="inprogress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
                <Chip label={r.status.toUpperCase()} color={r.status === "completed" ? "success" : r.status === "inprogress" ? "info" : "default"} variant="outlined" />
                <Typography variant="caption" color="text.secondary" sx={{ mt: { xs: 1, sm: 0 } }}>
                  Last Updated: Just now
                </Typography>
              </Box>
            </Paper>
          ))}

          {returnsToReceive.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
              No active return requests.
            </Typography>
          )}
        </Stack>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Section B: Returns Received */}
      <Box>
        <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
          Returns Received (Awaiting Store Confirmation)
        </Typography>

        <Stack spacing={3}>
          {returnsReceived.map((r) => (
            <Paper
              key={r.id}
              elevation={3}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Grid container spacing={2} alignItems="flex-start">
                {/* Left side: Return info */}
                <Grid
                  sx={{
                    xs: 12,
                    sm: 8,
                    maxWidth: { sm: "65%" }
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Return ID:
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {r.id}
                  </Typography>

                  <Box mt={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflowWrap: "break-word"
                      }}
                    >
                      {r.address}
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone:
                    </Typography>
                    <Typography variant="body2">{r.phone}</Typography>
                  </Box>
                </Grid>

                {/* Right side: Actions */}
                <Grid
                  sx={{
                    xs: 12,
                    sm: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Price:
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    Rs. {r.price.toLocaleString()}
                  </Typography>

                  <Chip label="Awaiting Store Confirmation" color="warning" size="small" sx={{ mt: 1 }} />

                  <Button variant="outlined" color="error" size="small" sx={{ mt: 1, textTransform: "none" }} onClick={() => handleRevert(r.id)}>
                    Revert to pending
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}

          {returnsReceived.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
              No packages waiting for store confirmation.
            </Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default OrderReturnRequests;
