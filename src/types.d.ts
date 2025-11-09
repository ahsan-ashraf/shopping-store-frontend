export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  province?: string;
  phone: string;
  isDefault?: boolean;
  type: "home" | "office";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicleRegNo?: string;
  companyPhone?: string;
  birthDate: string; // ISO
  gender: "male" | "female" | "other" | "";
  role: "super admin" | "admin" | "seller" | "buyer" | "rider" | "";
}

export interface Order {
  id: string;
  productImage: string;
  title: string;
  description: string;
  price: number;
  status:
    | "processing"
    | "packing"
    | "outForDelivery"
    | "riderOnWay"
    | "delivered"
    | "returned"
    | "canceled";
  date: string;
  category: string;
}

export type Registration = "buyer" | "seller" | "admin" | "rider";
export type SortOption = "latest" | "oldest" | "price_high" | "price_low";
export type OrderStatus = "pending" | "inprogress" | "delivered" | "failed";
export type ReturnStatus =
  | "pending"
  | "inprogress"
  | "completed"
  | "awaiting_store";
