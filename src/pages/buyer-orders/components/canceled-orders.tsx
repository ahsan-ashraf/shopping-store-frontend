import React, { useMemo } from "react";
import OrderTableWithReason from "./order-table-with-reason";
import type { Order, SortOption } from "../../../types";

const mockCanceledOrders: (Order & {
  reason?: string;
  initiatedBy?: string;
})[] = [
  {
    id: "1",
    productImage: "/images/products/laptop.jpg",
    title: "Laptop ProBook 15",
    description: "Intel i5 12th Gen, 8GB RAM, 512GB SSD",
    price: 165000,
    status: "canceled",
    date: "2025-11-01",
    category: "Computers",
    reason: "Canceled by buyer - Ordered by mistake.",
    initiatedBy: "Buyer",
  },
  {
    id: "2",
    productImage: "/images/products/shoes.jpg",
    title: "Running Shoes",
    description: "Size 42, breathable mesh, black/red",
    price: 7800,
    status: "canceled",
    date: "2025-11-03",
    category: "Footwear",
    reason: "Canceled by seller - Out of stock.",
    initiatedBy: "Seller",
  },
];

interface CanceledOrdersProps {
  sort: SortOption;
}

const CanceledOrders: React.FC<CanceledOrdersProps> = ({ sort }) => {
  const sortedOrders = useMemo(() => {
    const orders = [...mockCanceledOrders];
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
      emptyMessage="No canceled orders yet."
      emptyActionLabel="Continue Shopping"
    />
  );
};

export default CanceledOrders;
