import React, { useMemo } from "react";
import OrderTableWithReason from "./order-table-with-reason";
import type { Order, SortOption } from "../../../types";

const mockReturnedOrders: (Order & { reason?: string })[] = [
  {
    id: "1",
    productImage: "/images/products/watch.jpg",
    title: "Smart Watch GT4",
    description: "Heart rate, GPS, AMOLED display",
    price: 24500,
    status: "returned",
    date: "2025-10-29",
    category: "Wearables",
    reason: "Product not as described, poor battery backup.",
  },
];

interface ReturnedOrdersProps {
  sort: SortOption;
}
const ReturnedOrders: React.FC<ReturnedOrdersProps> = ({ sort }) => {
  const sortedOrders = useMemo(() => {
    const orders = [...mockReturnedOrders];
    switch (sort) {
      case "latest":
        return orders.sort((a, b) => (a.date < b.date ? 1 : -1));
      case "oldest":
        return orders.sort((a, b) => (a.date > b.date ? 1 : -1));
      case "price_high":
        return orders.sort((a, b) => b.price - a.price);
      case "price_low":
        return orders.sort((a, b) => a.price - b.price);
      default:
        return orders;
    }
  }, [sort]);
  return (
    <OrderTableWithReason
      orders={sortedOrders}
      showReason
      emptyMessage="No returned orders yet."
      emptyActionLabel="Continue Shopping"
    />
  );
};

export default ReturnedOrders;
