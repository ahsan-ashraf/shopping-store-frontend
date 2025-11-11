import React from "react";
import HighlightsSection from "./components/highlights-section";
import SectionHeader from "../../components/ui/secion-header";
import RecentOrdersTable from "./components/recent-orders";
import StoresTable from "./components/stores";
import BuyersTable from "./components/buyers";
import RidersTable from "./components/riders";
import SellersTable from "./components/sellers";
import AdminsTable from "./components/admins";

interface Props {}

const Admin: React.FC<Props> = ({}) => {
  return (
    <>
      <SectionHeader title="Admin" />
      <HighlightsSection />
      <RecentOrdersTable />
      <StoresTable />
      <SellersTable />
      <BuyersTable />
      <RidersTable />
      <AdminsTable />
    </>
  );
};

export default Admin;
