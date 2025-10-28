import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Page } from "types/models";
import { useReferralUserStore } from "./useReferralUserStore";
import { useShallow } from "zustand/react/shallow";
import { stringifyFilters } from "@lib/utils";
import {
  QueryReferralUserDto,
  QueryReferralUserStatsDto,
  SearchReferralUserDto,
} from "../models";

/**
 * React Query hooks wrapping ReferralUserService
 */
export const useReferralUserQueries = () => {
  const service = useReferralUserStore((state) => state.service);
  const filters = useReferralUserStore(useShallow((state) => state.filters));
  const normalizedFilters = stringifyFilters(filters);

  const useGetReferralUserStats = (userId: string) =>
    useQuery<QueryReferralUserStatsDto>({
      queryKey: ["referral-user-stats", userId] as const,
      queryFn: async (): Promise<QueryReferralUserStatsDto> =>
        service.getReferralUserStats(userId),
      enabled: !!userId, // only fetch if id exists
      placeholderData: (prev) => prev,
    });

  // Search trust_network list (paged)
  const useSearchReferralUserPage = (userId: string) =>
    useQuery<Page<QueryReferralUserDto>>({
      queryKey: ["referral-users", normalizedFilters, userId],
      queryFn: async (): Promise<Page<QueryReferralUserDto>> =>
        service.searchReferralUserPage(
          userId,
          filters as SearchReferralUserDto
        ),
      enabled: !!userId,
      placeholderData: (prev) => prev,
    });

  // Infinite scroll
  const useSearchReferralUserInfinite = (userId: string) =>
    useInfiniteQuery<
      Page<QueryReferralUserDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryReferralUserDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: ["referral-users-infinite", normalizedFilters, userId] as const,
      queryFn: async ({
        pageParam = 0,
      }): Promise<Page<QueryReferralUserDto>> =>
        service.searchReferralUserPage(
          userId,{
          ...filters,
          page: pageParam,
        } as SearchReferralUserDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  return {
    useGetReferralUserStats,
    useSearchReferralUserPage,
    useSearchReferralUserInfinite
  };
};
