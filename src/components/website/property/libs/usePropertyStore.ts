"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import {
  QueryPropertyDto,
  SearchPropertyDto,
} from "@components/website/property/models";
import { PropertyService } from "@components/website/property/libs/property-service";
import { httpClient } from "containers";

// -----------------------------
// Default filters (zero-indexed pagination)
// -----------------------------
const defaultFilters: Partial<SearchPropertyDto> = {
  page: 0,
  page_size: 2,

  price_min: undefined,
  price_max: undefined,
  sort: "recommended" as const,
  layout: "grid" as const,
  bedrooms: "any" as const,
  bathrooms: 0,
  home_types: [],
  land_types: [],
  title_docs: [],
  development_stage: [],
  utilities: {},
  proximity: { categories: [], distanceKm: 10 },
  zoning: [],
};

// -----------------------------
// Store Shape
// -----------------------------
interface PropertyStore {
  service: PropertyService; // runtime only (not persisted)
  filters: Partial<SearchPropertyDto>; // persisted + synced with query params
  currentProperty: QueryPropertyDto | null; // persisted only
  setFilters: (
    updater:
      | Partial<SearchPropertyDto>
      | ((prev: Partial<SearchPropertyDto>) => Partial<SearchPropertyDto>)
  ) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof SearchPropertyDto>(
    key: K,
    value: SearchPropertyDto[K]
  ) => void;
  setCurrentProperty: (currentProperty: QueryPropertyDto | null) => void;
}

// -----------------------------
// Zustand Store
// -----------------------------
// - uses persist middleware to store filters + currentProperty in localStorage
// - service is runtime only (not persisted)
// -----------------------------
export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set) => {
      const service = new PropertyService(httpClient);

      return {
        service, // NOT persisted
        filters: defaultFilters,
        currentProperty: null,

        // replace filters entirely or via updater
        setFilters: (updater) =>
          set((state) => ({
            filters:
              typeof updater === "function" ? updater(state.filters) : updater,
          })),

        // reset to defaults
        resetFilters: () => set({ filters: defaultFilters }),

        // update a single filter key
        updateFilter: (key, value) =>
          set((state) => ({
            filters: { ...state.filters, [key]: value },
          })),

        // update the currently selected property
        setCurrentProperty: (currentProperty) => set({ currentProperty }),
      };
    },
    {
      name: "veriprops-properties", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist only filters + currentProperty, skip service
      partialize: (state: { filters: any; currentProperty: any }) => ({
        filters: state.filters,
        currentProperty: state.currentProperty,
      }),
    }
  )
);

// -----------------------------
// Hook: usePropertyQueryState
// -----------------------------
// - Keeps filters in sync with URL query params
// - Persists filters to localStorage (handled by zustand persist)
// - Provides update + reset helpers
// -----------------------------
export function usePropertyQueryState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // keep stable reference for initial filters
  const initialRef = useRef(defaultFilters);

  const filters = usePropertyStore((s) => s.filters);
  const setFilters = usePropertyStore((s) => s.setFilters);
  const resetFilters = usePropertyStore((s) => s.resetFilters);

  // -----------------------------
  // Effect: sync URL → store
  // Runs whenever searchParams change
  // -----------------------------
  useEffect(() => {
    const queryFilters: Partial<SearchPropertyDto> = {};

    for (const [key, rawValue] of searchParams.entries()) {
    try {
      const decoded = decodeURIComponent(rawValue);

      if (decoded === "true" || decoded === "false") {
        queryFilters[key as keyof SearchPropertyDto] = (decoded === "true") as any;
      } else if (!isNaN(Number(decoded)) && decoded !== "") {
        queryFilters[key as keyof SearchPropertyDto] = Number(decoded) as any;
      } else if (decoded.startsWith("{") || decoded.startsWith("[")) {
        queryFilters[key as keyof SearchPropertyDto] = JSON.parse(decoded);
      } else if (decoded.includes(",")) {
        queryFilters[key as keyof SearchPropertyDto] = decoded.split(",") as any;
      } else {
        queryFilters[key as keyof SearchPropertyDto] = decoded as any;
      }
    } catch {
      queryFilters[key as keyof SearchPropertyDto] = rawValue as any;
    }
  }

    // merge with defaults
    const next = { ...initialRef.current, ...queryFilters };

    // only update if filters actually changed
    usePropertyStore.setState((prev) => ({
      ...prev,
      filters:
        JSON.stringify(prev.filters) === JSON.stringify(next)
          ? prev.filters
          : next,
    }));
  }, [searchParams.toString()]);

  // -----------------------------
  // Function: updateFilters
  // Updates store + URL query params + persists via zustand
  // -----------------------------
  const updateFilters = useCallback(
    (
      updates:
        | Partial<SearchPropertyDto>
        | ((prev: Partial<SearchPropertyDto>) => Partial<SearchPropertyDto>)
    ) => {
      setFilters((prev) => {
        const newFilters =
          typeof updates === "function"
            ? { ...prev, ...updates(prev) }
            : { ...prev, ...updates };

        // build URLSearchParams from new filters
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            !(Array.isArray(value) && value.length === 0)
          ) {
            if (Array.isArray(value)) {
              params.set(key, value.join(","));
            } else if (typeof value === "object") {
              params.set(key, encodeURIComponent(JSON.stringify(value)));
            } else {
              params.set(key, String(value));
            }
          }
        });

        const newSearch = params.toString();
        const newUrl = `${pathname}${newSearch ? `?${newSearch}` : ""}`;
        const currentUrl = `${pathname}${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`;

        // update browser URL if changed
        if (newUrl !== currentUrl) router.replace(newUrl);

        return newFilters;
      });
    },
    [pathname, router, searchParams]
  );

  return [filters, updateFilters, resetFilters] as const;
}
