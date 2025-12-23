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
  role: Role;
}

export interface Order {
  id: string;
  productImage: string;
  title: string;
  description: string;
  price: number;
  status: "processing" | "packing" | "outForDelivery" | "riderOnWay" | "delivered" | "returned" | "canceled";
  date: string;
  category: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  brand?: string;
  bio?: string;
  banner?: string;
  icon?: string;
  socials: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
  };
}
export interface StoreStats {
  date: string;
  impressions: number;
  views: number;
  orders: number;
  cancelRate: string;
  successRate: string;
  returnRate: string;
}
export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  addedDate: string;
  views: number;
  orders: number;
  cancelations: number;
  returns: number;
  success: number;
}

export enum Role {
  SuperAdmin,
  Admin,
  Seller,
  Rider,
  Buyer,
}
export enum OperationalState {
  Active,
  Blocked,
  Suspended,
}
export enum ApprovalState {
  Pending,
  Approved,
  Rejected,
}

export type Registration = "buyer" | "seller" | "admin" | "rider";
export type SortOption = "latest" | "oldest" | "price_high" | "price_low";
export type OrderStatus = "pending" | "inprogress" | "delivered" | "failed";
export type ReturnStatus = "pending" | "inprogress" | "completed" | "awaiting_store";
