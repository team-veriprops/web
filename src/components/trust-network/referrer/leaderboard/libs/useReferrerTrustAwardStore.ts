import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";
import {
  ReferrerTrustAwardCategoryKey,
  SearchReferrerTrustAwardDto,
} from "../models";
import { ReferrerTrustAwardService } from "./referral-trust-award-service";

const defaultFilters: Partial<SearchReferrerTrustAwardDto> = {
  page: 0,
  page_size: 6,
  region: "all",
  category: ReferrerTrustAwardCategoryKey.TOP_TRUST,
};

const cloneDefaultFilters = (): Partial<SearchReferrerTrustAwardDto> => ({
  ...defaultFilters,
});

interface ReferrerTrustAwardStore {
  service: ReferrerTrustAwardService; // runtime only (not persisted)
  filters: Partial<SearchReferrerTrustAwardDto>; // persisted + synced with query params
  timeLastUpdated: Date | null;
  setFilters: (
    updater:
      | Partial<SearchReferrerTrustAwardDto>
      | ((
          prev: Partial<SearchReferrerTrustAwardDto>
        ) => Partial<SearchReferrerTrustAwardDto>)
  ) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchReferrerTrustAwardDto>(
    key: K,
    value: SearchReferrerTrustAwardDto[K]
  ) => void;
  updateFilters: (updates: Partial<SearchReferrerTrustAwardDto>) => void; // <—
  setTimeLastUpdated: (timeLastUpdated: Date) => void;
}

// runtime service instance (not persisted)
const service = new ReferrerTrustAwardService(httpClient);

export const useReferrerTrustAwardStore = create<ReferrerTrustAwardStore>()(
  persist(
    (set) => ({
      service,
      filters: cloneDefaultFilters(),
      timeLastUpdated: null,

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

      // update the currently selected referral_user
      setTimeLastUpdated: (timeLastUpdated) => set({ timeLastUpdated }),
    }),

    {
      name: "veriprops-referrer_trust_award", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentReferrerTrustCategory, skip service
      partialize: (state: {
        filters: any;
        timeLastUpdated: Date;
      }) => ({
        filters: state.filters,
        timeLastUpdated: state.timeLastUpdated,
      }),
    }
  )
);
