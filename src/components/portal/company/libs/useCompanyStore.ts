import { create } from "zustand";
import { QueryCompanyDto, SearchCompanyDto} from "../models";
import { CompanyService } from "./company-service";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";

const defaultFilters: Partial<SearchCompanyDto> = {
  page: 0,
  page_size: 6,
};

const cloneDefaultFilters = (): Partial<SearchCompanyDto> => ({
  ...defaultFilters,
});

interface CompanyStore {
  service: CompanyService; // runtime only (not persisted)
  filters: Partial<SearchCompanyDto>; // persisted + synced with query params
  currentCompany: QueryCompanyDto | null; // persisted only
  viewCompanyDetail: boolean;
  setFilters: (
    updater:
      | Partial<SearchCompanyDto>
      | ((prev: Partial<SearchCompanyDto>) => Partial<SearchCompanyDto>)
  ) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchCompanyDto>(
    key: K,
    value: SearchCompanyDto[K]
  ) => void;
  updateFilters: (updates: Partial<SearchCompanyDto>) => void; // <—
  setCurrentCompany: (currentCompany: QueryCompanyDto | null) => void;
  setViewCompanyDetail: (viewCompanyDetail: boolean) => void;
}

// runtime service instance (not persisted)
const service = new CompanyService(httpClient);

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      service,
      filters: cloneDefaultFilters(),
      currentCompany: null,
      viewCompanyDetail: false,

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

      // update the currently selected company
      setCurrentCompany: (currentCompany) => set({ currentCompany }),
      setViewCompanyDetail: (viewCompanyDetail) => set({ viewCompanyDetail }),
    }),
    {
      name: "veriprops-company", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentCompany, skip service
      partialize: (state: { filters: any; currentCompany: any; viewCompanyDetail: boolean }) => ({
        filters: state.filters,
        currentCompany: state.currentCompany,
        viewCompanyDetail: state.viewCompanyDetail
      }),
    }
  )
);
