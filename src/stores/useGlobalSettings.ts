import { Language, PropertyType, TransactionCurrency } from "@components/website/property/models";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

export interface GlobalSettings{
	language: Language;
	currency: TransactionCurrency;
  propertyType: PropertyType;
  rowsPerPage: number;
}

interface GlobalSettingsState {
  settings: GlobalSettings;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: TransactionCurrency) => void;
  setPropertyType: (propertyType: PropertyType) => void;
  setSettings: (settings: GlobalSettings) => void;
  reset: () => void;
  setRecordsPerPage: (rowsPerPage: number) => void;
}

export const useGlobalSettings = create<GlobalSettingsState>()(
  persist(
    (set) => ({
      settings: {
        language: Language.ENGLISH,
        currency: TransactionCurrency.NGN,
        propertyType: PropertyType.LAND,
        rowsPerPage: 5,
      },
      setLanguage: (language) =>
        set((state) => ({
          settings: { ...state.settings, language },
        })),
      setCurrency: (currency) =>
        set((state) => ({
          settings: { ...state.settings, currency },
        })),
      setPropertyType: (propertyType) =>
        set((state) => ({
          settings: { ...state.settings, propertyType },
        })),
      setSettings: (settings) => set({ settings }),
      reset: () =>
        set({
          settings: {
            language: Language.ENGLISH,
            currency: TransactionCurrency.NGN,
            propertyType: PropertyType.LAND,
            rowsPerPage: 5,
          }}),
      setRecordsPerPage: (rowsPerPage) =>
        set((state) => ({
          settings: { ...state.settings, rowsPerPage },
        })),
    }),
    {
      name: "global-settings", // key in localStorage
    }
  )
);
