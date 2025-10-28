import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";
import { QueryReferralUserDto, SearchReferralUserDto } from "../models";
import { ReferralUserService } from "./referral-user-service";

const defaultFilters: Partial<SearchReferralUserDto> = {
  page: 0,
  page_size: 6,
};

const cloneDefaultFilters = (): Partial<SearchReferralUserDto> => ({
  ...defaultFilters,
});

interface ReferralUserStore {
  service: ReferralUserService; // runtime only (not persisted)
  filters: Partial<SearchReferralUserDto>; // persisted + synced with query params
  currentReferral: QueryReferralUserDto | null; // persisted only
  viewCurrentReferralNetwork: boolean;
  setFilters: (
    updater:
      | Partial<SearchReferralUserDto>
      | ((
          prev: Partial<SearchReferralUserDto>
        ) => Partial<SearchReferralUserDto>)
  ) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchReferralUserDto>(
    key: K,
    value: SearchReferralUserDto[K]
  ) => void;
  updateFilters: (updates: Partial<SearchReferralUserDto>) => void; // <—
  setCurrentReferral: (currentReferral: QueryReferralUserDto | null) => void;
  setViewCurrentReferralNetwork: (viewCurrentReferralNetwork: boolean) => void;
}

// runtime service instance (not persisted)
const service = new ReferralUserService(httpClient);

export const useReferralUserStore = create<ReferralUserStore>()(
  persist(
    (set) => ({
      service,
      filters: cloneDefaultFilters(),
      currentReferral: null,
      viewCurrentReferralNetwork: false,

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
      setCurrentReferral: (currentReferral) => set({ currentReferral }),
      setViewCurrentReferralNetwork: (viewCurrentReferralNetwork) =>
        set({ viewCurrentReferralNetwork }),
    }),

    {
      name: "veriprops-referral_user", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentReferral, skip service
      partialize: (state: {
        filters: any;
        currentReferral: any;
        viewCurrentReferralNetwork: boolean;
      }) => ({
        filters: state.filters,
        currentReferral: state.currentReferral,
        viewCurrentReferralNetwork: state.viewCurrentReferralNetwork,
      }),
    }
  )
);
