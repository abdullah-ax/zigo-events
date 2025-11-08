/**
 * Type definitions for the Zigo Events application
 */

export interface Guest {
  id: string;
  name: string;
  phone: string;
  status: "confirmed" | "pending";
}

export interface Vendor {
  id: string;
  name: string;
  category: "venue" | "catering" | "photography" | "entertainment" | "decoration";
  price: number;
  paymentStatus: "pending" | "deposited" | "paid";
}

export interface CompletedCategories {
  venue?: boolean;
  catering?: boolean;
  photography?: boolean;
  entertainment?: boolean;
  decoration?: boolean;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  type: string;
  vendors?: Vendor[];
  guests?: Guest[];
  completedCategories: CompletedCategories;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
}

export interface MockVendor {
  id: string;
  name: string;
  description: string;
  category: "venue" | "catering" | "photography" | "entertainment" | "decoration";
  rating: number;
  price: {
    base: number;
    range: [number, number];
  };
  portfolioImages: string[];
  reviews: Review[];
  availability: string[];
}
