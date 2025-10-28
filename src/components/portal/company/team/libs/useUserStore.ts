import { create } from "zustand";
import { QueryCompanyUserDto, SearchCompanyUserDto} from "../models";
import { UserService } from "./user-service";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";

const defaultFilters: Partial<SearchCompanyUserDto> = {
  page: 0,
  page_size: 6,
};

const cloneDefaultFilters = (): Partial<SearchCompanyUserDto> => ({
  ...defaultFilters,
});

interface UserStore {
  service: UserService; // runtime only (not persisted)
  filters: Partial<SearchCompanyUserDto>; // persisted + synced with query params
  currentUser: QueryCompanyUserDto | null; // persisted only
  activeTab: string;
  viewUserDetail: boolean;
  setFilters: (
    updater:
      | Partial<SearchCompanyUserDto>
      | ((prev: Partial<SearchCompanyUserDto>) => Partial<SearchCompanyUserDto>)
  ) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchCompanyUserDto>(
    key: K,
    value: SearchCompanyUserDto[K]
  ) => void;
  updateFilters: (updates: Partial<SearchCompanyUserDto>) => void; // <—
  setCurrentUser: (currentUser: QueryCompanyUserDto | null) => void;
  setActiveTab: (activeTab: string) => void;
  setViewUserDetail: (viewUserDetail: boolean) => void;
}

// runtime service instance (not persisted)
const service = new UserService(httpClient);

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      service,
      filters: cloneDefaultFilters(),
      currentUser: null,
      activeTab: "members",
      viewUserDetail: false,

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

      // update the currently selected user
      setCurrentUser: (currentUser) => set({ currentUser }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setViewUserDetail: (viewUserDetail) => set({ viewUserDetail }),
    }),
    {
      name: "veriprops-user", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentUser, skip service
      partialize: (state: { filters: any; currentUser: any; viewUserDetail: boolean }) => ({
        filters: state.filters,
        currentUser: state.currentUser,
        viewUserDetail: state.viewUserDetail
      }),
    }
  )
);
