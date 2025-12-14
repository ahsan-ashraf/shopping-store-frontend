import React, { useState } from "react";
import type { SyntheticEvent } from "react";
import { Box, Paper, Tabs, Tab, FormControl, Select, MenuItem, type SelectChangeEvent, Typography } from "@mui/material";
import SectionHeader from "../../components/ui/secion-header";
import TabPanel from "./components/tab-panel";
import ActiveOrders from "./components/active-orders";
import CompletedOrders from "./components/completed-orders";
import ReturnedOrders from "./components/returned-orders";
import CanceledOrders from "./components/canceled-orders";
import { type SortOption } from "../../types";

interface OrdersPageProps {}

const BuyerOrders: React.FC<OrdersPageProps> = () => {
  const [tab, setTab] = useState<number>(0);
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
    setSortOption(event.target.value as SortOption);
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 3 } }}>
      <SectionHeader title="Orders" />

      <Paper elevation={3} sx={{ px: 2, py: 1 }}>
        <Tabs value={tab} onChange={handleChange} aria-label="buyer orders tabs" sx={{ "& .MuiTabs-flexContainer": { gap: 1 } }}>
          <Tab label="Active Orders" id="orders-tab-0" />
          <Tab label="Completed Orders" id="orders-tab-1" />
          <Tab label="Returned Orders" id="orders-tab-2" />
          <Tab label="Canceled Orders" id="orders-tab-3" />
        </Tabs>
      </Paper>

      {tab !== 0 && (
        <Box sx={{ mt: 5, mb: -2 }}>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.5
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Sort</Typography>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select<SortOption> value={sortOption} onChange={handleSortChange}>
                <MenuItem value="latest">Latest Orders</MenuItem>
                <MenuItem value="oldest">Oldest Orders</MenuItem>
                <MenuItem value="price_high">Price: High to Low</MenuItem>
                <MenuItem value="price_low">Price: Low to High</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Box>
      )}

      <Box>
        <TabPanel value={tab} index={0}>
          <ActiveOrders />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <CompletedOrders sort={sortOption} />
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <ReturnedOrders sort={sortOption} />
        </TabPanel>

        <TabPanel value={tab} index={3}>
          <CanceledOrders sort={sortOption} />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default BuyerOrders;
