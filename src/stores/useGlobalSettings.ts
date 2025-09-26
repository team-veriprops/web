import {
  Language,
  PropertyType,
  TransactionCurrency,
} from "@components/website/property/models";
import { usePropertyStore } from "@components/website/property/_usePropertyStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GlobalSettings {
  language: Language;
  currency: TransactionCurrency;
  propertyType: PropertyType;
  rowsPerPage: number;
  searchDebounceSeconds: number;
  searchQueryKey: string;
}

interface GlobalSettingsState {
  settings: GlobalSettings;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: TransactionCurrency) => void;
  setPropertyType: (propertyType: PropertyType) => void;
  setSettings: (settings: GlobalSettings) => void;
  reset: () => void;
  setRecordsPerPage: (rowsPerPage: number) => void;
  setSearchDebounceSeconds: (searchDebounceSeconds: number) => void;
  setSearchQueryKey: (searchQueryKey: string) => void;
}

export const useGlobalSettings = create<GlobalSettingsState>()(
  persist(
    (set) => ({
      settings: {
        language: Language.ENGLISH,
        currency: TransactionCurrency.NGN,
        propertyType: PropertyType.LAND,
        rowsPerPage: 5,
        searchDebounceSeconds: 300,
        searchQueryKey: "query",
      },
      setLanguage: (language) =>
        set((state) => ({
          settings: { ...state.settings, language },
        })),
      setCurrency: (currency) =>
        set((state) => ({
          settings: { ...state.settings, currency },
        })),
      setPropertyType: (propertyType) => {
        set((state) => ({
          settings: { ...state.settings, propertyType },
        }));

        // Sync to PropertyStore
        usePropertyStore.getState().updateFilter("type", propertyType);
      },
      setSettings: (settings) => set({ settings }),
      reset: () =>
        set({
          settings: {
            language: Language.ENGLISH,
            currency: TransactionCurrency.NGN,
            propertyType: PropertyType.LAND,
            rowsPerPage: 5,
            searchDebounceSeconds: 300,
            searchQueryKey: "query",
          },
        }),
      setRecordsPerPage: (rowsPerPage) =>
        set((state) => ({
          settings: { ...state.settings, rowsPerPage },
        })),
      setSearchDebounceSeconds: (searchDebounceSeconds) =>
        set((state) => ({
          settings: { ...state.settings, searchDebounceSeconds },
        })),
      setSearchQueryKey: (searchQueryKey) =>
        set((state) => ({
          settings: { ...state.settings, searchQueryKey },
        })),
    }),
    {
      name: "global-settings", // key in localStorage
    }
  )
);
