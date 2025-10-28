import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";
import { ActivityEventService } from "./activities-service";
import { QueryActivityEventDto, SearchActivityEventDto } from "../models";

const defaultFilters: Partial<SearchActivityEventDto> = {
  page: 0,
  page_size: 2,
};

const cloneDefaultFilters = (): Partial<SearchActivityEventDto> => ({
  ...defaultFilters,
});

interface ActivityEventStore {
  service: ActivityEventService; // runtime only (not persisted)
  filters: Partial<SearchActivityEventDto>;
  updateFilters: (updates: Partial<SearchActivityEventDto>) => void;
  currentActivityEvent: QueryActivityEventDto | null; // persisted only
  setCurrentActivityEvent: (
    currentActivityEvent: QueryActivityEventDto | null
  ) => void;
}

// runtime service instance (not persisted)
const service = new ActivityEventService(httpClient);

export const useActivityEventStore = create<ActivityEventStore>()(
  persist(
    (set) => ({
      service,
      currentActivityEvent: null,
      filters: cloneDefaultFilters(),
      setCurrentActivityEvent: (currentActivityEvent) =>
        set({ currentActivityEvent }),
      updateFilters: (updates) =>
        set((state) => ({
          filters: { ...state.filters, ...updates },
        })),
    }),

    {
      name: "veriprops-activities", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state: {
        filters: SearchActivityEventDto;
        currentActivityEvent: any;
      }) => ({
        filters: state.filters,
        currentActivityEvent: state.currentActivityEvent,
      }),
    }
  )
);
