import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Page } from "types/models";
import { useDisputeStore } from "./useDisputeStore";
import { stringifyFilters } from "@lib/utils";
import {
  CreateDisputeDto,
  QueryDisputeConversationDto,
  QueryDisputeDto,
  QueryDisputeResolutionTimelineDto,
  QueryDisputeStatsDto,
  SearchDisputeConversationDto,
  SearchDisputeDto,
  SearchDisputeResolutionTimelineDto,
} from "../models";
import { useShallow } from "zustand/react/shallow";

/**
 * React Query hooks wrapping DisputeService
 */
export const useDisputeQueries = () => {
  const service = useDisputeStore((state) => state.service);
  const {
    disputeFilters,
    disputeConversationFilters,
    disputeResolutionTimelineFilters,
  } = useDisputeStore(
    useShallow((state) => ({
      disputeFilters: state.disputeFilters,
      disputeConversationFilters: state.disputeConversationFilters,
      disputeResolutionTimelineFilters: state.disputeResolutionTimelineFilters,
    }))
  );
  const normalizedDisputeFilters = stringifyFilters(disputeFilters);
  const normalizedDisputeConversationFilters = stringifyFilters(
    disputeConversationFilters
  );
  const normalizedDisputeResolutionTimelineFilters = stringifyFilters(
    disputeResolutionTimelineFilters
  );
  const queryClient = useQueryClient();

  const useCreateDispute = (userId: string) =>
    useMutation({
      mutationFn: (payload: CreateDisputeDto) =>
        service.createDispute(userId, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dispute", userId],
        });
      },
    });

  const useGetDisputeStats = (userId: string) =>
    useQuery<QueryDisputeStatsDto>({
      queryKey: ["dispute-stats", userId] as const,
      queryFn: async (): Promise<QueryDisputeStatsDto> =>
        service.getDisputeStats(userId),
      enabled: !!userId, // only fetch if id exists
      placeholderData: (prev) => prev,
    });

  // Search trust_network list (paged)
  const useSearchDisputePage = (userId: string) =>
    useQuery<Page<QueryDisputeDto>>({
      queryKey: ["disputes", normalizedDisputeFilters, userId],
      queryFn: async (): Promise<Page<QueryDisputeDto>> =>
        service.searchDisputePage(userId, disputeFilters as SearchDisputeDto),
      enabled: !!userId,
      placeholderData: (prev) => prev,
    });

  // Infinite scroll
  const useSearchDisputeInfinite = (userId: string) =>
    useInfiniteQuery<
      Page<QueryDisputeDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryDisputeDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: [
        "disputes-infinite",
        normalizedDisputeFilters,
        userId,
      ] as const,
      queryFn: async ({ pageParam = 0 }): Promise<Page<QueryDisputeDto>> =>
        service.searchDisputePage(userId, {
          ...disputeFilters,
          page: pageParam,
        } as SearchDisputeDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  // Infinite scroll
  const useSearchDisputeConversationInfinite = (
    userId: string,
    disputeId: string
  ) =>
    useInfiniteQuery<
      Page<QueryDisputeConversationDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryDisputeConversationDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: [
        "dispute-conversations-infinite",
        normalizedDisputeConversationFilters,
        userId,
        disputeId,
      ] as const,
      queryFn: async ({
        pageParam = 0,
      }): Promise<Page<QueryDisputeConversationDto>> =>
        service.searchDisputeConversationPage(userId, disputeId, {
          ...disputeConversationFilters,
          page: pageParam,
        } as SearchDisputeConversationDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  // Infinite scroll
  const useSearchDisputeResolutionTimelineInfinite = (
    userId: string,
    disputeId: string
  ) =>
    useInfiniteQuery<
      Page<QueryDisputeResolutionTimelineDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryDisputeResolutionTimelineDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: [
        "dispute-conversations-infinite",
        normalizedDisputeResolutionTimelineFilters,
        userId,
        disputeId,
      ] as const,
      queryFn: async ({
        pageParam = 0,
      }): Promise<Page<QueryDisputeResolutionTimelineDto>> =>
        service.searchDisputeResolutionTimelinePage(userId, disputeId, {
          ...disputeResolutionTimelineFilters,
          page: pageParam,
        } as SearchDisputeResolutionTimelineDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  return {
    useCreateDispute,
    useGetDisputeStats,
    useSearchDisputePage,
    useSearchDisputeInfinite,
    useSearchDisputeConversationInfinite,
    useSearchDisputeResolutionTimelineInfinite,
  };
};
