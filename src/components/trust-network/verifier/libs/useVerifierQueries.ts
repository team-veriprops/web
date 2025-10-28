import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Page } from "types/models";
import { useVerifierStore } from "./useVerifierStore";
import { stringifyFilters } from "@lib/utils";
import {
  CreateVerifierDto,
  CreateVerifierResponseDto,
  CreateVerifierResponseUploadsDto,
  QueryVerifierActivityAuditDto,
  QueryVerifierDto,
  QueryVerifierResponseDto,
  QueryVerifierTaskDto,
  QueryVerifierTaskStatsDto,
  SearchVerifierActivityAuditDto,
  SearchVerifierDto,
  SearchVerifierTaskDto,
} from "../models";
import { useShallow } from "zustand/react/shallow";

/**
 * React Query hooks wrapping VerifierService
 */
export const useVerifierQueries = () => {
  const service = useVerifierStore((state) => state.service);
  const { verifierFilters, verifierTaskFilters, verifierActivityAuditFilters } =
    useVerifierStore(
      useShallow((state) => ({
        verifierFilters: state.verifierFilters,
        verifierTaskFilters: state.verifierTaskFilters,
        verifierActivityAuditFilters: state.verifierActivityAuditFilters,
      }))
    );
  const normalizedVerifierFilters = stringifyFilters(verifierFilters);
  const normalizedVerifierTaskFilters = stringifyFilters(verifierTaskFilters);
  const normalizedVerifierActivityAuditFilters = stringifyFilters(
    verifierActivityAuditFilters
  );
  const queryClient = useQueryClient();

  /**
   * VERIFIER
   */
  const useCreateVerifier = () =>
    useMutation({
      mutationFn: (payload: CreateVerifierDto) =>
        service.createVerifier(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["create-verifier"],
        });
      },
    });

  const useSearchVerifierPage = () =>
    useQuery<Page<QueryVerifierDto>>({
      queryKey: ["search-verifiers", normalizedVerifierFilters],
      queryFn: async (): Promise<Page<QueryVerifierDto>> =>
        service.searchVerifierPage(verifierFilters as SearchVerifierDto),
      placeholderData: (prev) => prev,
    });

  /**
   * VERIFIER TASK STAT
   */
  const useGetVerifierTaskStats = (verifierId: string) =>
    useQuery<QueryVerifierTaskStatsDto>({
      queryKey: ["verifier-tasks-stats", verifierId] as const,
      queryFn: async (): Promise<QueryVerifierTaskStatsDto> =>
        service.getVerifierTaskStats(verifierId),
      enabled: !!verifierId,
      placeholderData: (prev) => prev,
    });

  const useSearchVerifierTaskPage = (verifierId: string) =>
    useQuery<Page<QueryVerifierTaskDto>>({
      queryKey: ["verifiers", normalizedVerifierTaskFilters, verifierId],
      queryFn: async (): Promise<Page<QueryVerifierTaskDto>> =>
        service.searchVerifierTaskPage(
          verifierId,
          verifierTaskFilters as SearchVerifierTaskDto
        ),
      enabled: !!verifierId,
      placeholderData: (prev) => prev,
    });

  /**
   * VERIFIER TASK RESPONSE
   */
  const useCreateVerifierTaskResponse = (taskId: string) =>
    useMutation({
      mutationFn: (payload: CreateVerifierResponseDto) =>
        service.createVerifierTaskResponse(taskId, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["create-verifier-task-response", taskId],
        });
      },
    });

  const useCreateVerifierTaskResponseUpload = (taskId: string) =>
    useMutation({
      mutationFn: (payload: CreateVerifierResponseUploadsDto) =>
        service.createVerifierTaskResponse(taskId, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["create-verifier-task-response-uploads", taskId],
        });
      },
    });

  const useGetVerifierTaskResponse = (taskId: string) =>
    useQuery<QueryVerifierResponseDto>({
      queryKey: ["get-verifier-tasks-response", taskId] as const,
      queryFn: async (): Promise<QueryVerifierResponseDto> =>
        service.getVerifierTaskResponse(taskId),
      enabled: !!taskId,
      placeholderData: (prev) => prev,
    });

  /**
   * VERIFIER ACTIVITY AUDIT
   */

  // Infinite scroll
  const useSearchVerifierActivityAuditPageInfinite = (taskId: string) =>
    useInfiniteQuery<
      Page<QueryVerifierActivityAuditDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryVerifierActivityAuditDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: [
        "verifier-activity-audit-infinite",
        normalizedVerifierActivityAuditFilters,
        taskId,
      ] as const,
      queryFn: async ({
        pageParam = 0,
      }): Promise<Page<QueryVerifierActivityAuditDto>> =>
        service.searchVerifierActivityAuditPage(taskId, {
          ...verifierTaskFilters,
          page: pageParam,
        } as SearchVerifierActivityAuditDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  return {
    useCreateVerifier,
    useSearchVerifierPage,
    useGetVerifierTaskStats,
    useSearchVerifierTaskPage,
    useCreateVerifierTaskResponse,
    useCreateVerifierTaskResponseUpload,
    useGetVerifierTaskResponse,
    useSearchVerifierActivityAuditPageInfinite,
  };
};
