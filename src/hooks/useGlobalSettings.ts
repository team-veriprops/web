import { Language, PropertyType, TransactionCurrency } from "@components/property/models";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

export interface GlobalSettings{
	language: Language;
	currency: TransactionCurrency;
  propertyType: PropertyType;
}

interface GlobalSettingsState {
  settings: GlobalSettings;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: TransactionCurrency) => void;
  setPropertyType: (propertyType: PropertyType) => void;
  setSettings: (settings: GlobalSettings) => void;
  reset: () => void;
}

export const useGlobalSettings = create<GlobalSettingsState>()(
  persist(
    (set) => ({
      settings: {
        language: Language.ENGLISH,
        currency: TransactionCurrency.NGN,
        propertyType: PropertyType.LAND, // default
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
          },
        }),
    }),
    {
      name: "global-settings", // key in localStorage
    }
  )
);
