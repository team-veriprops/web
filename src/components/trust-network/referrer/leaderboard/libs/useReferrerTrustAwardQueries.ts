import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { Page } from "types/models";
import { useReferrerTrustAwardStore } from "./useReferrerTrustAwardStore";
import { useShallow } from "zustand/react/shallow";
import { stringifyFilters } from "@lib/utils";
import {
  QueryReferrerTrustAwardDto,
  ReferrerTrustAwardCategoryKey,
  SearchReferrerTrustAwardDto,
} from "../models";
import { useEffect } from "react";

/**
 * React Query hooks wrapping ReferrerTrustAwardService
 */
export const useReferrerTrustAwardQueries = () => {
  const { service, setTimeLastUpdated } = useReferrerTrustAwardStore();
  const filters = useReferrerTrustAwardStore(
    useShallow((state) => state.filters)
  );
  const normalizedFilters = stringifyFilters(filters);

  const useGetReferrerTrustAwardCategoryWinners = () => {
    const result = useQuery<QueryReferrerTrustAwardDto[]>({
      queryKey: ["referral-trust-award"] as const,
      queryFn: async (): Promise<QueryReferrerTrustAwardDto[]> =>
        service.getReferrerTrustAwardCategoryWinners(),
      // enabled: !!userId, // only fetch if id exists
      placeholderData: (prev) => prev,
    });

    // useEffect(() => {
    //   if (result.data) {
    //     setTimeLastUpdated(new Date());
    //   }
    // }, [result.status]);

    return result;
  };

  // Search trust_network list (paged)
  const useSearchReferrerTrustAwardPage = (page?: number, page_size?: number, category?: ReferrerTrustAwardCategoryKey) =>
    useQuery<Page<QueryReferrerTrustAwardDto>>({
      queryKey: ["referral-trust-award", normalizedFilters, page, page_size],
      queryFn: async (): Promise<Page<QueryReferrerTrustAwardDto>> =>
        service.searchReferrerTrustAwardPage({
          ...filters,
          page: page !== undefined && page >= 0 ? page : filters.page!,
          page_size: page_size || filters.page_size,
          category: category || filters.category,
        } as SearchReferrerTrustAwardDto),
      // enabled: !!userId,
      placeholderData: (prev) => prev,
    });

  // Infinite scroll
  const useSearchReferrerTrustAwardInfinite = () => {
    const result = useInfiniteQuery<
      Page<QueryReferrerTrustAwardDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryReferrerTrustAwardDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: ["referral-trust-award", normalizedFilters] as const,
      queryFn: async ({
        pageParam = 0,
      }): Promise<Page<QueryReferrerTrustAwardDto>> =>
        service.searchReferrerTrustAwardPage({
          ...filters,
          page: pageParam,
        } as SearchReferrerTrustAwardDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

    useEffect(() => {
      if (result.data) {
        setTimeLastUpdated(new Date());
      }
    }, [result.status, result.data]);

    return result;
  };

  return {
    useGetReferrerTrustAwardCategoryWinners,
    useSearchReferrerTrustAwardPage,
    useSearchReferrerTrustAwardInfinite,
  };
};
