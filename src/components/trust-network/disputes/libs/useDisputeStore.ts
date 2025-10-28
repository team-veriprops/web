import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";
import {
  QueryDisputeDto,
  SearchDisputeConversationDto,
  SearchDisputeDto,
  SearchDisputeResolutionTimelineDto,
} from "../models";
import { DisputeService } from "./dispute-service";

const defaultDisputeFilters: Partial<SearchDisputeDto> = {
  page: 0,
  page_size: 6,
};

const cloneDefaultDisputeFilters = (): Partial<SearchDisputeDto> => ({
  ...defaultDisputeFilters,
});

const defaultDisputeConversationFilters: Partial<SearchDisputeConversationDto> =
  {
    page: 0,
    page_size: 6,
  };

const cloneDefaultDisputeConversationFilters =
  (): Partial<SearchDisputeConversationDto> => ({
    ...defaultDisputeConversationFilters,
  });

const defaultDisputeResolutionTimelineFilters: Partial<SearchDisputeResolutionTimelineDto> =
  {
    page: 0,
    page_size: 6,
  };

const cloneDefaultDisputeResolutionTimelineFilters =
  (): Partial<SearchDisputeResolutionTimelineDto> => ({
    ...defaultDisputeResolutionTimelineFilters,
  });

interface DisputeStore {
  service: DisputeService; // runtime only (not persisted)
  disputeFilters: Partial<SearchDisputeDto>; // persisted + synced with query params
  disputeConversationFilters: Partial<SearchDisputeConversationDto>;
  disputeResolutionTimelineFilters: Partial<SearchDisputeResolutionTimelineDto>;
  currentDispute: QueryDisputeDto | null; // persisted only
  viewCurrentDispute: boolean;
  newDisputeModalOpened: boolean;
  updateDisputeFilters: (updates: Partial<SearchDisputeDto>) => void; // <—
  updateDisputeConversationFilters: (
    updates: Partial<SearchDisputeConversationDto>
  ) => void; // <—
  updateDisputeResolutionTimelineFilters: (
    updates: Partial<SearchDisputeResolutionTimelineDto>
  ) => void; // <—
  setCurrentDispute: (currentDispute: QueryDisputeDto | null) => void;
  setViewCurrentDispute: (viewCurrentDispute: boolean) => void;
  setNewDisputeModalOpened: (newDisputeModalOpened: boolean) => void
}

// runtime service instance (not persisted)
const service = new DisputeService(httpClient);

export const useDisputeStore = create<DisputeStore>()(
  persist(
    (set) => ({
      service,
      disputeFilters: cloneDefaultDisputeFilters(),
      disputeConversationFilters: cloneDefaultDisputeConversationFilters(),
      disputeResolutionTimelineFilters:
        cloneDefaultDisputeResolutionTimelineFilters(),
      currentDispute: null,
      viewCurrentDispute: false,
      newDisputeModalOpened: false,

      // update multiple filter keys at once
      updateDisputeFilters: (updates) =>
        set((state) => ({
          disputeFilters: { ...state.disputeFilters, ...updates },
        })),
      updateDisputeConversationFilters: (updates) =>
        set((state) => ({
          disputeConversationFilters: {
            ...state.disputeConversationFilters,
            ...updates,
          },
        })),
      updateDisputeResolutionTimelineFilters: (updates) =>
        set((state) => ({
          disputeResolutionTimelineFilters: {
            ...state.disputeResolutionTimelineFilters,
            ...updates,
          },
        })),

      // update the currently selected dispute
      setCurrentDispute: (currentDispute) => set({ currentDispute }),
      setViewCurrentDispute: (viewCurrentDispute) =>
        set({ viewCurrentDispute }),
      setNewDisputeModalOpened: (newDisputeModalOpened) =>
        set({ newDisputeModalOpened }),
    }),

    {
      name: "veriprops-dispute", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentDispute, skip service
      partialize: (state: {
        disputeFilters: any;
        disputeConversationFilters: any;
        disputeResolutionTimelineFilters: any;
        currentDispute: any;
        viewCurrentDispute: boolean;
        newDisputeModalOpened: boolean;
      }) => ({
        disputeFilters: state.disputeFilters,
        disputeConversationFilters: state.disputeConversationFilters,
        disputeResolutionTimelineFilters:
          state.disputeResolutionTimelineFilters,
        currentDispute: state.currentDispute,
        viewCurrentDispute: state.viewCurrentDispute,
        newDisputeModalOpened: state.newDisputeModalOpened,
      }),
    }
  )
);
