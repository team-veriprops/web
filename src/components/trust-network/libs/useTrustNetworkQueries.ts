import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateTrustNetworkDto,
  QueryTrustNetworkDto,
  SearchTrustNetworkDto,
} from "@components/trust-network/models";
import { Page } from "types/models";
import { useTrustNetworkStore } from "./useTrustNetworkStore";
import { useShallow } from "zustand/react/shallow";
import { stringifyFilters } from "@lib/utils";

/**
 * React Query hooks wrapping TrustNetworkService
 */
export const useTrustNetworkQueries = () => {
  const service = useTrustNetworkStore((state) => state.service);
  const filters = useTrustNetworkStore(useShallow((state) => state.filters));
  const queryClient = useQueryClient();
  const normalizedFilters = stringifyFilters(filters);

  const useCreateTrustNetwork = () =>
    useMutation({
      mutationFn: (payload: CreateTrustNetworkDto) =>
        service.createTrustNetwork(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["trust-network"],
        });
      },
    });

    const useGetTrustNetwork = (user_id: string) =>
      useQuery<QueryTrustNetworkDto>({
        queryKey: ["trust-network", user_id] as const,
        queryFn: async (): Promise<QueryTrustNetworkDto> =>
          service.getTrustNetwork(user_id),
        enabled: !!user_id, // only fetch if id exists
        placeholderData: (prev) => prev,
      });

  // Search trust_network list (paged)
  const useSearchTrustNetworkPage = () =>
    useQuery<Page<QueryTrustNetworkDto>>({
      queryKey: ["trust-networks", normalizedFilters],
      queryFn: async (): Promise<Page<QueryTrustNetworkDto>> =>
        service.searchTrustNetworkPage(filters as SearchTrustNetworkDto),
      placeholderData: (prev) => prev,
    });

  return {
    useCreateTrustNetwork,
    useGetTrustNetwork,
    useSearchTrustNetworkPage,
  };
};
