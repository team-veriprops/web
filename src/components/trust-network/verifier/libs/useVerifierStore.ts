import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "containers";
import {
  QueryVerifierDto,
  SearchVerifierDto,
  SearchVerifierTaskDto,
  SearchVerifierActivityAuditDto,
  QueryVerifierTaskDto,
} from "../models";
import { VerifierService } from "./verifier-service";

const defaultVerifierFilters: Partial<SearchVerifierDto> = {
  page: 0,
  page_size: 6,
};

const cloneDefaultVerifierFilters = (): Partial<SearchVerifierDto> => ({
  ...defaultVerifierFilters,
});

const defaultVerifierTaskFilters: Partial<SearchVerifierTaskDto> = {
  page: 0,
  page_size: 6,
};

const cloneDefaultVerifierTaskFilters = (): Partial<SearchVerifierTaskDto> => ({
  ...defaultVerifierTaskFilters,
});

const defaultVerifierActivityAuditFilters: Partial<SearchVerifierActivityAuditDto> =
  {
    page: 0,
    page_size: 6,
  };

const cloneDefaultVerifierActivityAuditFilters =
  (): Partial<SearchVerifierActivityAuditDto> => ({
    ...defaultVerifierActivityAuditFilters,
  });

interface VerifierStore {
  service: VerifierService; // runtime only (not persisted)
  verifierFilters: Partial<SearchVerifierDto>; // persisted + synced with query params
  verifierTaskFilters: Partial<SearchVerifierTaskDto>;
  verifierActivityAuditFilters: Partial<SearchVerifierActivityAuditDto>;
  currentVerifier: QueryVerifierDto | null; // persisted only
  viewCurrentVerifier: boolean;
  viewVerifierTaskDeclineDialog: boolean;
  viewVerifierTaskSignatureDialog: boolean;
  currentVerifierTask: QueryVerifierTaskDto | null; // persisted only
  viewCurrentVerifierTask: boolean;
  updateVerifierFilters: (updates: Partial<SearchVerifierDto>) => void; // <—
  updateVerifierTaskFilters: (updates: Partial<SearchVerifierTaskDto>) => void; // <—
  updateVerifierActivityAuditFilters: (
    updates: Partial<SearchVerifierActivityAuditDto>
  ) => void; // <—
  setCurrentVerifier: (currentVerifier: QueryVerifierDto) => void;
  setViewCurrentVerifier: (viewCurrentVerifier: boolean) => void;
  setViewVerifierTaskDeclineDialog: (
    viewVerifierTaskDeclineDialog: boolean
  ) => void;
  setViewVerifierTaskSignatureDialog: (
    viewVerifierTaskSignatureDialog: boolean
  ) => void;
  setCurrentVerifierTask: (currentVerifierTask: QueryVerifierTaskDto) => void;
  setViewCurrentVerifierTask: (viewCurrentVerifierTask: boolean) => void;
}

// runtime service instance (not persisted)
const service = new VerifierService(httpClient);

export const useVerifierStore = create<VerifierStore>()(
  persist(
    (set) => ({
      service,
      verifierFilters: cloneDefaultVerifierFilters(),
      verifierTaskFilters: cloneDefaultVerifierTaskFilters(),
      verifierActivityAuditFilters: cloneDefaultVerifierActivityAuditFilters(),
      currentVerifier: null,
      viewCurrentVerifier: false,
      viewVerifierTaskDeclineDialog: false,
      viewVerifierTaskSignatureDialog: false,
      currentVerifierTask: null,
      viewCurrentVerifierTask: false,

      // update multiple filter keys at once
      updateVerifierFilters: (updates) =>
        set((state) => ({
          verifierFilters: { ...state.verifierFilters, ...updates },
        })),
      updateVerifierTaskFilters: (updates) =>
        set((state) => ({
          verifierTaskFilters: {
            ...state.verifierTaskFilters,
            ...updates,
          },
        })),
      updateVerifierActivityAuditFilters: (updates) =>
        set((state) => ({
          verifierActivityAuditFilters: {
            ...state.verifierActivityAuditFilters,
            ...updates,
          },
        })),
      setCurrentVerifier: (currentVerifier: QueryVerifierDto) =>
        set({ currentVerifier }),
      setViewCurrentVerifier: (viewCurrentVerifier: boolean) =>
        set({ viewCurrentVerifier }),
      setViewVerifierTaskDeclineDialog: (
        viewVerifierTaskDeclineDialog: boolean
      ) => set({ viewVerifierTaskDeclineDialog }),
      setViewVerifierTaskSignatureDialog: (
        viewVerifierTaskSignatureDialog: boolean
      ) => set({ viewVerifierTaskSignatureDialog }),
      setCurrentVerifierTask: (currentVerifierTask: QueryVerifierTaskDto) =>
        set({ currentVerifierTask }),
      setViewCurrentVerifierTask: (viewCurrentVerifierTask: boolean) =>
        set({ viewCurrentVerifierTask }),
    }),

    {
      name: "veriprops-verifier", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentVerifier, skip service
      partialize: (state: {
        verifierFilters: SearchVerifierDto;
        verifierTaskFilters: SearchVerifierTaskDto;
        verifierActivityAuditFilters: SearchVerifierActivityAuditDto;
        currentVerifier: QueryVerifierDto;
        viewCurrentVerifier: boolean;
        viewVerifierTaskDeclineDialog: boolean;
        viewVerifierTaskSignatureDialog: boolean;
        currentVerifierTask: QueryVerifierTaskDto;
        viewCurrentVerifierTask: boolean;
      }) => ({
        verifierFilters: state.verifierFilters,
        verifierTaskFilters: state.verifierTaskFilters,
        verifierActivityAuditFilters: state.verifierActivityAuditFilters,
        currentVerifier: state.currentVerifier,
        viewCurrentVerifier: state.viewCurrentVerifier,
        viewVerifierTaskDeclineDialog: state.viewVerifierTaskDeclineDialog,
        viewVerifierTaskSignatureDialog: state.viewVerifierTaskSignatureDialog,
        currentVerifierTask: state.currentVerifierTask,
        viewCurrentVerifierTask: state.viewCurrentVerifierTask,
      }),
    }
  )
);
