import { create } from "zustand";
import { QueryPurchaseDto, SearchPurchaseDto } from "../models";
import { PurchaseService } from "./purchase-service";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";
import { PropertyType } from "@components/website/property/models";

const defaultFilters: Partial<SearchPurchaseDto> = {
  page: 0,
  page_size: 6,
  type: PropertyType.LAND
};

const cloneDefaultFilters = (): Partial<SearchPurchaseDto> => ({
  ...defaultFilters,
});

interface PurchaseStore {
  service: PurchaseService; // runtime only (not persisted)
  filters: Partial<SearchPurchaseDto>; // persisted + synced with query params
  currentPurchase: QueryPurchaseDto | null; // persisted only
  viewPurchaseDetail: boolean;
  setFilters: (
    updater:
      | Partial<SearchPurchaseDto>
      | ((prev: Partial<SearchPurchaseDto>) => Partial<SearchPurchaseDto>)
  ) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchPurchaseDto>(
    key: K,
    value: SearchPurchaseDto[K]
  ) => void;
  updateFilters: (updates: Partial<SearchPurchaseDto>) => void; // <—
  setCurrentPurchase: (currentPurchase: QueryPurchaseDto | null) => void;
  setViewPurchaseDetail: (viewPurchaseDetail: boolean) => void;
}

// runtime service instance (not persisted)
const service = new PurchaseService(httpClient);

export const usePurchaseStore = create<PurchaseStore>()(
  persist(
    (set) => ({
      service,
      filters: cloneDefaultFilters(),
      currentPurchase: null,
      viewPurchaseDetail: false,

      // merge filters (instead of replacing)
      setFilters: (updater) =>
        set((state) => {
          const next =
            typeof updater === "function" ? updater(state.filters) : updater;
          return { filters: { ...state.filters, ...next } };
        }),

      // reset to defaults
      resetFilters: () => set({ filters: cloneDefaultFilters() }),

      // update a single filter key
      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      // update multiple filter keys at once
      updateFilters: (updates) =>
        set((state) => ({
          filters: { ...state.filters, ...updates },
        })),

      // update the currently selected purchase
      setCurrentPurchase: (currentPurchase) => set({ currentPurchase }),
      setViewPurchaseDetail: (viewPurchaseDetail) => set({ viewPurchaseDetail }),
    }),
    {
      name: "veriprops-purchase", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentPurchase, skip service
      partialize: (state: { filters: any; currentPurchase: any; viewPurchaseDetail: boolean }) => ({
        filters: state.filters,
        currentPurchase: state.currentPurchase,
        viewPurchaseDetail: state.viewPurchaseDetail,
      }),
    }
  )
);
