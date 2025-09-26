import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QueryPropertyDto, SearchPropertyDto } from "@components/website/property/models";
import { PropertyService } from "@components/website/property/property-service";
import { httpClient } from "containers";

interface PropertyStore {
  service: PropertyService;
  filters: Partial<SearchPropertyDto>;
  currentProperty: QueryPropertyDto | null;
  setFilters: (filters: Partial<SearchPropertyDto>) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchPropertyDto>(
    key: K,
    value: SearchPropertyDto[K]
  ) => void;
  setCurrentProperty: (currentProperty: QueryPropertyDto | null) => void;
}

const defaultFilters: Partial<SearchPropertyDto> = {
  page: 0,
  page_size: 2,
};

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set) => {
      const service = new PropertyService(httpClient);

      return {
        service,
        filters: defaultFilters,
        currentProperty: null,

        setFilters: (filters) => set({ filters }),
        resetFilters: () => set({ filters: defaultFilters }),
        updateFilter: (key, value) =>
          set((state) => ({
            filters: { ...state.filters, [key]: value },
          })),
        setCurrentProperty: (currentProperty) => set({ currentProperty }),
      };
    },
    {
      name: "property-filters", // localStorage key
      partialize: (state: { filters: any; currentProperty: QueryPropertyDto }) => ({ filters: state.filters, currentProperty: state.currentProperty,}), // persist only filters
    }
  )
);
