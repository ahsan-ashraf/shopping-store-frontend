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
  phone?: string;
  birthDate?: string; // ISO
  gender?: "male" | "female" | "other" | "";
}
