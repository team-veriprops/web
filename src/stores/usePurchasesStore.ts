import { PropertyType } from "@components/website/property/models";
import { create } from "zustand";

export interface Purchase {
  id: string;
  type: PropertyType;
  title: string;
  image: string;
  price: number;
  date: string;
  status: "cancelled" | "completed" | "pending";
}

interface State {
  purchases: Purchase[];
  fetchPurchases: () => void;
}

export const usePurchasesStore = create<State>((set) => ({
  purchases: [],
  fetchPurchases: () =>
    set({
      purchases: [
        {
          id: "1",
          type: PropertyType.LAND,
          title: "600sqm Land in Ibeju Lekki",
          image: "/mock/land.jpg",
          price: 2500000,
          date: "2025-07-12",
          status: "completed",
        },
        {
          id: "2",
          type: PropertyType.HOUSE,
          title: "3-Bedroom Duplex, Lekki",
          image: "/mock/duplex.jpg",
          price: 75000000,
          date: "2025-08-01",
          status: "pending",
        },
        {
          id: "3",
          type: PropertyType.SERVICE,
          title: "Legal Verification Service",
          image: "/mock/service.jpg",
          price: 150000,
          date: "2025-08-22",
          status: "cancelled",
        },
      ],
    }),
}));
