import React from "react";
import { Paper, Typography, Grid, Tooltip, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import AppCard from "../../../components/ui/app-card";

interface Store {
  id: string;
  name: string;
  image: string;
}

interface SellerStoresSectionProps {
  stores: Store[];
  onSelectStore: (storeId: string) => void;
  onCreateStore: () => void;
}

const SellerStoresSection: React.FC<SellerStoresSectionProps> = ({
  stores,
  onSelectStore,
  onCreateStore,
}) => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3, borderRadius: 2, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Stores
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {stores.map((store) => (
          <Grid key={store.id} sx={{ width: 220 }}>
            <AppCard
              image={store.image}
              title={store.name}
              onClick={() => onSelectStore(store.id)}
            />
          </Grid>
        ))}

        {/* Add New Store Card */}
        <Grid>
          <Tooltip title="Create New Store" arrow>
            <Card
              onClick={onCreateStore}
              sx={{
                width: 220,
                height: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: theme.palette.action.hover,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: theme.palette.action.selected,
                  transform: "scale(1.03)",
                  boxShadow: 6,
                  cursor: "pointer",
                },
              }}
            >
              <AddIcon
                sx={{ fontSize: 60, color: theme.palette.text.secondary }}
              />
            </Card>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SellerStoresSection;
