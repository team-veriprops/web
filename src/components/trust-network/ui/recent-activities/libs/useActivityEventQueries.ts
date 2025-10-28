"use client";

import {
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useActivityEventStore } from "./useActivityEventStore";
import { QueryActivityEventDto, SearchActivityEventDto } from "../models";
import { Page } from "types/models";
import { useShallow } from "zustand/react/shallow";
import { stringifyFilters } from "@lib/utils";

/**
 * React Query hooks wrapping ActivityEventService
 */
export const useActivityEventQueries = () => {
  const service = useActivityEventStore((state) => state.service);
  const filters = useActivityEventStore(useShallow((state) => state.filters));
  const normalizedFilters = stringifyFilters(filters);

  // Infinite scroll
  const useSearchActivityEventInfinite = () =>
    useInfiniteQuery<
      Page<QueryActivityEventDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryActivityEventDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: ["activities", normalizedFilters] as const,
      queryFn: async ({
        pageParam = 0,
      }): Promise<Page<QueryActivityEventDto>> =>
        service.searchActivityEventPage({
          ...filters,
          page: pageParam,
        } as SearchActivityEventDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  return {
    useSearchActivityEventInfinite,
  };
};
