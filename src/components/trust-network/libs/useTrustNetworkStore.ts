import { create } from "zustand";
import {
  ProfessionType,
  QueryTrustNetworkDto,
  RoleType,
  SearchTrustNetworkDto,
} from "../models";
import { TrustNetworkService } from "./trust-network-service";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";

const defaultFilters: Partial<SearchTrustNetworkDto> = {
  page: 0,
  page_size: 6,
};

const cloneDefaultFilters = (): Partial<SearchTrustNetworkDto> => ({
  ...defaultFilters,
});

interface TrustNetworkStore {
  service: TrustNetworkService; // runtime only (not persisted)
  filters: Partial<SearchTrustNetworkDto>; // persisted + synced with query params
  currentTrustNetwork: QueryTrustNetworkDto | null; // persisted only
  viewTrustNetworkDetail: boolean;
  openLearnMore: boolean;
  openOnboarding: boolean;
  currentOnboardingStage: number;
  selectedRole: RoleType;
  selectedProfession: ProfessionType;
  shareRankModalOpened: boolean;
  setFilters: (
    updater:
      | Partial<SearchTrustNetworkDto>
      | ((
          prev: Partial<SearchTrustNetworkDto>
        ) => Partial<SearchTrustNetworkDto>)
  ) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchTrustNetworkDto>(
    key: K,
    value: SearchTrustNetworkDto[K]
  ) => void;
  updateFilters: (updates: Partial<SearchTrustNetworkDto>) => void; // <—
  setCurrentTrustNetwork: (
    currentTrustNetwork: QueryTrustNetworkDto | null
  ) => void;
  setViewTrustNetworkDetail: (viewTrustNetworkDetail: boolean) => void;
  setOpenLearnMore: (openLearnMore: boolean) => void;
  setOpenOnboarding: (openOnboarding: boolean) => void;
  setCurrentOnboardingStage: (currentOnboardingStage: number) => void;
  setSelectedRole: (selectedRole: RoleType) => void;
  setSelectedProfession: (selectedProfession: ProfessionType) => void;
  setShareRankModalOpened: (shareRankModalOpened: boolean) => void
}

// runtime service instance (not persisted)
const service = new TrustNetworkService(httpClient);

export const useTrustNetworkStore = create<TrustNetworkStore>()(
  persist(
    (set) => ({
      service,
      filters: cloneDefaultFilters(),
      currentTrustNetwork: null,
      viewTrustNetworkDetail: false,
      openLearnMore: false,
      openOnboarding: false,
      currentOnboardingStage: 1,
      selectedRole: null,
      selectedProfession: null,
      shareRankModalOpened: false,

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

      // update the currently selected trust_network
      setCurrentTrustNetwork: (currentTrustNetwork) =>
        set({ currentTrustNetwork }),
      setViewTrustNetworkDetail: (viewTrustNetworkDetail) =>
        set({ viewTrustNetworkDetail }),
      setOpenLearnMore: (openLearnMore) => set({ openLearnMore }),
      setOpenOnboarding: (openOnboarding) => set({ openOnboarding }),
      setCurrentOnboardingStage: (currentOnboardingStage) =>
        set({ currentOnboardingStage }),
      setSelectedRole: (selectedRole) => set({ selectedRole }),
      setSelectedProfession: (selectedProfession) =>
        set({ selectedProfession }),
      setShareRankModalOpened: (shareRankModalOpened) => set({shareRankModalOpened}),
    }),

    {
      name: "veriprops-trust_network", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentTrustNetwork, skip service
      partialize: (state: {
        filters: any;
        currentTrustNetwork: any;
        viewTrustNetworkDetail: boolean;
        openLearnMore: boolean;
        openOnboarding: boolean;
        currentOnboardingStage: number;
        selectedRole: RoleType;
        selectedProfession: ProfessionType;
        shareRankModalOpened: boolean;
      }) => ({
        filters: state.filters,
        currentTrustNetwork: state.currentTrustNetwork,
        viewTrustNetworkDetail: state.viewTrustNetworkDetail,
        openLearnMore: state.openLearnMore,
        openOnboarding: state.openOnboarding,
        currentOnboardingStage: state.currentOnboardingStage,
        selectedRole: state.selectedRole,
        selectedProfession: state.selectedProfession,
        shareRankModalOpened: state.shareRankModalOpened,
      }),
    }
  )
);
